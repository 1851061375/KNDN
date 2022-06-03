import React, { FC, useState, useEffect, useRef } from 'react'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { List, Avatar, Skeleton, Divider, Button } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './NewsCarousel.scss'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify'
import { requestGET } from '../../../../helpers/baseAPI'
import { CONFIG } from '../../../../helpers/config'
import { Modal } from 'antd'
import { useSelector } from 'react-redux'
import { left } from '@popperjs/core';
import InfiniteScroll from 'react-infinite-scroll-component';

const NewsCarousel = () => {

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

  const ref = useRef();
  const goTo = (slide) => {
    ref.current.goToSlide(slide, false);
  };

  //change carousel => active list
  const onChange = () => {

  }
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <>
      {/* BEGIN: Section Product auction */}
      <div className='section-new-carousel'>
        <div className="section-title-holder">
          <h1 className="section-title">Tin tức</h1>
          {/* <div className='section-border' style={{ backgroundImage: `url(${toAbsoluteUrl('/media/patterns/section-border.png')})` }}></div> */}
          <div className="section-subtitle"></div>
        </div>
        <div className='row'>
          <div className="col-4 col-lg-12 col-xl-4 section-list-new-carousel-left">
            <div
              id="listNews"
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
                scrollableTarget="listNews" 
              >
                <List
                  dataSource={data}
                  renderItem={(item, index) => (
                    <List.Item key={"list" + item.ID} onClick={() => goTo(index)}>
                      {/* <List.Item.Meta
                                                avatar={<Avatar src={CONFIG.FILE_URL + item.Image} />}
                                                title={<a href="#">{item.Title}</a>}
                                            /> */}
                      <img width={50} src={CONFIG.FILE_URL + item.Image} />
                      <div>
                        {item.Title}
                      </div>
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            </div>
          </div>

          <div className="col-8 col-lg-12 col-xl-8">
            <div className="new-carousel">
              <Carousel
                responsive={responsive}
                showDots={false}
                ref={ref}
                arrows={false}
                autoPlay
                autoPlaySpeed={6000}
                slidesToSlide={1}
                swipeable
                afterChange={onChange}
              >
                {data.map((i) => (
                  <div className='news-carousel-item' key={"carousel" + i.ID}>
                    <div className="d-flex align-items-start">
                      <img className="news-image" src={CONFIG.FILE_URL + i.Image} />
                      <div className="carousel-caption">
                        <h5>{i.Title}</h5>
                        {/* <div dangerouslySetInnerHTML={{ __html: i.Content }}></div> */}
                        <div>
                          <Button
                            type="primary"
                            onClick={() => { history.push(`/newsdetail/${i.ID}`); }}
                          >
                            &gt;&gt;&gt; Đọc tin &gt;&gt;&gt;
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div></div>
        </div>
      </div>
    </>
  )
}
export { NewsCarousel }
