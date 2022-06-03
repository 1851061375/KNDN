/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {Card, Col, Row} from 'react-bootstrap-v5'

const CardMain = (props) => {
  const {title, CustomTitle, CustomTools} = props
  return (
    <Card className='td-dbcont rounded h-100'>
      <Card.Header className='d-flex flex-row  justify-content-between align-items-center '>
        <div className='head-caption d-flex align-items-center flex-grow-1'>
          <div className='head-title'>
            <p className='head-text m-0'>{title || ''}</p>
          </div>
          {CustomTitle && <CustomTitle />}
        </div>
        <div className='head-tools'>
          {CustomTools && <CustomTools />}
          <span
            className='cursor-pointer btn btn-clean btn-sm btn-icon btn-active-light-primary'
            title='Tạo mới nhắc việc'
          >
            <i className='icon-1x text-dark-50 flaticon2-talk'></i>
          </span>
        </div>
      </Card.Header>
      <Card.Body className='p-0'>
        <Row className='td-db-chart-numbers m-0'>
          <Col className='p-1 mt-1 mb-1'>{props.children}</Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export {CardMain}
