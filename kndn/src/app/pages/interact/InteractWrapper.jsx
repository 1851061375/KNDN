/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { CONFIG } from '../../../helpers/config'
import { requestPOST, requestGET } from '../../../helpers/baseAPI'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button } from 'antd'

const InteractPage = () => {

  return <div className='col-xl-12'></div>
}

const InteractWrapper = ({messages}) => {
  const {id} = useParams();
  const accessToken = useSelector(state => state.auth.accessToken)
  const user = useSelector((state) => state.auth.user)
  const intl = useIntl()
  const [chatlist, setChatList] = useState([]);
  const [detailChat, setDetailChat] = useState([]);
  const [contentChat, setContentChat] = useState("");
  const [loading, setLoading] = useState(true);
  const divRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      var body = {
        "token" : accessToken,
        "idPhanAnh": id
      }
      let res = await requestPOST(CONFIG.PAHT_PATH +'/DanhSachTuongTac', body)
      let data = res?.data?.ThongTinTuongTac ?? []
      if (data) {
        setDetailChat(data)
        console.log(data)
      }
    }
    try {
      if (loading) {
        fetchData()
        setLoading(false)
      }
    } catch (error) { }
    return () => {
      setDetailChat([])
    }
  }, [loading])

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);
  const postTuongTac = async () => {
    console.log(accessToken)

    var body = {
      "token": accessToken,
      "TuongTac": {
        "PhanAnhID": id,
        "NoiDung": contentChat,
        "Loai": "CongDan"
      }
    }
    let res = await requestPOST(CONFIG.PAHT_PATH + "/CreateTuongTac", body)
    if (res != null) {
      setContentChat("")
      setLoading(true)
      scrollToBottom()
      console.log("Gửi tin nhắn thành công")
    }
    else {
      console.log("Gửi thất bại")
    }
  }
  return (
    <>
      <InteractPage />
      <div className='row' style={{ backgroundColor: "white", height: "700px" }}>
        {/* <div className='col-3 pl-0' style={{ borderRight: "1px solid #efe6e6" }}>
          <div>
          </div>
        </div> */}
        <div className='col-12'>
          <div className='card-header'>
            <h4 style={{ textAlign: "center", paddingTop: "15px" }}>
              Nội dung chat
            </h4>
          </div>
          <div id="ContentChat" className='scroll-y me-n5 pe-5 h-500px mb-5' ref={messagesEndRef} >
            {detailChat?.map((cont) =>
              <div style={{
                display: "flex",
                padding: "2px",
                justifyContent: (cont?.Loai === "CanBo") ? "flex-start" : "flex-end"
              }}>
                <div className={(cont?.Loai === "CanBo") ? 'p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-start' : 'p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-end'}>
                  {cont.NoiDung}
                </div>
                <div  />
              </div>
            )}
          </div>
          <div className='row card-footer pt-4' style={{}}>
            <textarea className='col-9 form-control form-control-flush mb-3"'
              placeholder="Type a message"
              value={contentChat}
              autoFocus = {true}
              title='Nội dung gửi'
              rows={"1"}
              onChange={(e) => { setContentChat(e.target.value) }}>
            </textarea>
            <div className='d-flex flex-stack'>
              <div className='d-flex align-items-center me-2'>
              </div>
              <button className='btn btn-primary' type='buton' title='Gửi tin nhắn' onClick={() => { postTuongTac() }}>
                Gửi
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export { InteractWrapper }
