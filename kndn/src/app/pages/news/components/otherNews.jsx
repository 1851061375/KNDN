/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { FC, useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { Rate } from 'antd'
import './otherNews.scss'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component';
import { requestGET } from '../../../../helpers/baseAPI'
import { CONFIG } from '../../../../helpers/config'
import { List, Avatar, Skeleton, Divider, Button, Card } from 'antd'
import { Link, useHistory } from "react-router-dom";
import { DiffOutlined } from "@ant-design/icons"

const OtherNews = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const history = useHistory();
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    const fetchData = async () => {
      var res = await requestGET(`${CONFIG.GETWAY_PATH}/listarticles?skip=${data.length}&take=5`);
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
    <Card title={<span><DiffOutlined /> Tin tức khác</span>} extra={<Link to="/news">Xem thêm</Link>}>
      <div
        id="listNews"
        style={{
          height: 400,
          overflow: 'auto',
          padding: '20px 16px',
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more</Divider>}
          scrollableTarget="listNews"
        >
          <List
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item key={"list" + item.ID} onClick={() => history.push(`/newsdetail/${item.ID}`)}>
                <img width={50} src={CONFIG.FILE_URL + item.Image} />
                <div>
                  {item.Title}
                </div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </Card>
  )
}

export { OtherNews }
