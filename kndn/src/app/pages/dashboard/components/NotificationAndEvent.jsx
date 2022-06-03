/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { List, Avatar, Skeleton, Divider } from 'antd'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { useLayout } from '../../../../_metronic/layout/core'
import { requestGET } from '../../../../helpers/baseAPI'
import { CONFIG } from '../../../../helpers/config'
import { RightOutlined } from '@ant-design/icons'
import InfiniteScroll from 'react-infinite-scroll-component'
import 'react-multi-carousel/lib/styles.css';
import './NotificationAndEvent.scss';

const NotificationAndEvent = () => {
  const { config, classes, attributes } = useLayout()
  const { header, aside } = config
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    const fetchData = async () => {
      var res = await requestGET(`${CONFIG.GETWAY_PATH}/listarticles?skip=${data.length}&take=10`);
      var _data = res?.data ?? []
      setData([...data, ..._data]);
      setLoading(false);
    }
    fetchData()
    return () => {

    }
  };

  useEffect(() => {
    loadMoreData();
  }, [])
  return (
    <>

      <div className='section-new-carousel'>
        <div className="section-title-holder">
          <h1 className="section-title">Sự kiện</h1>
        </div>
        <div>
          <div
            id="listNotificationAndEvents"
            style={{
              height: 400,
              overflow: 'auto',
              padding: '0 16px',
              border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
          >
            <InfiniteScroll
              dataLength={data.length}
              next={loadMoreData}
              hasMore={data.length < 50}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={<Divider plain>It is all, nothing more</Divider>}
              scrollableTarget="listNotificationAndEvents"
            >
              <List
                dataSource={data}
                renderItem={(item, index) => (
                  <List.Item key={"list" + item.ID} onClick={() => { }}>
                    {/* <List.Item.Meta
                                                avatar={<Avatar src={CONFIG.FILE_URL + item.Image} />}
                                                title={<a href="#">{item.Title}</a>}
                                            /> */}
                    <RightOutlined /><div>{item.Title}</div>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  )
}
export { NotificationAndEvent }
