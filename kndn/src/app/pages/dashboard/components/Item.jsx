/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { FC, useState } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { Rate } from 'antd'
import './Item.scss'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify'
import { requestPOST } from '../../../../helpers/baseAPI'
import { CONFIG } from '../../../../helpers/config'
import { Modal } from 'antd'
import { useSelector } from 'react-redux'

const Item = ({ item }) => {
    const accessToken = useSelector(state => state.auth.accessToken);
    const user = useSelector(state => state.auth.user);
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [rate, setRate] = useState(5);
    const reducer = (previousValue, currentValue) => previousValue + currentValue.Diem;

    const showModal = (value) => {
        setRate(value)
        setVisible(true);
    };

    const handleOk = () => {
        setModalText('');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 1000);
        PostDanhGia()
    };

    const handleCancel = () => {
        setVisible(false);
        setRate(rate)
    };

    const PostDanhGia = async () => {
        var body = {
            "token": accessToken,
            "danhGia": {
                "PhanAnhID": item.ID,
                "Diem": `${rate}`,
                "NoiDung": modalText
            }
        }
        let res = await requestPOST(CONFIG.PAHT_PATH + '/CreateDanhGia', body)
        if (res == null) {
            toast.error("Gửi không thành công")
        }
        else {
            toast.success("Gửi đánh giá thành công")
        }
    }
    const history = useHistory();
    return (

        <div className="card card-faq-item" >
            <div className="card-category position-absolute top-0" title={item.LinhVucText}>
                <span className='card-category-icon'>
                    <i className={(item?.LinhVuc?.Icon) ? ('fa ' + item.LinhVuc.Icon  + " text") : 'fa fa-city'}></i>
                </span>
                <label className='card-category-name'>{item.LinhVucText}</label>
            </div>
            <div onClick={() => history.push(`/thong-tin-phan-anh/${item.ID}`)} className='card-img-wrapper' style={{backgroundImage: `url(${toAbsoluteUrl('/media/logos/default_avatar.jpg')})`}}>
                <a>
                    <img src={(item?.AnhDaiDien) ? (CONFIG.FILE_URL + item?.AnhDaiDien) : (toAbsoluteUrl("/media/logos/default_avatar.jpg"))} className="card-img-top" />
                </a>
            </div>
            <div className="card-body" onClick={() => history.push(`/thong-tin-phan-anh/${item.ID}`)}>
                <div className={`card-status position-absolute bg-success`}>
                    <span className={'fa fa-check'}></span>
                </div>
                <Link className="card-title fw-bolder">{item.TieuDe}</Link>
                <p className='mb-0 text-truncate text-muted'><span className='fa fa-clock text-success w-20px'></span>{item.ThoiGianGui ? moment(item.ThoiGianGui).format('hh:mm DD/MM/YYYY') : 'Chưa xác định'}</p>
                <p className='text-truncate text-muted'><span className='fa fa-map-marker-alt text-success w-20px' style={{ fontSize: "larger" }}></span>{item.DiaChi ? item.DiaChi : "Chưa xác định"}</p>
                <p className="card-text card-faq-desc mb-0">{item.NoiDung}</p>
            </div>
            <div className="card-footer">
                <div className="row">
                    <div className="col-auto card-rate">
                        <Rate defaultValue={rate} allowHalf value={item?.DiemDanhGia > 0 ? item.DiemDanhGia : (item.DanhGia?.reduce(reducer, 0) / item.DanhGia?.length)} onChange={
                            (value) => showModal(value)
                        } />
                    </div>
                    <div className="col card-comment align-self-center text-end">
                        <a>
                            <span onClick={() => history.push(`/thong-tin-phan-anh/${item.ID}`)} className='fa fa-comment-dots'></span> <span className='num-comment fw-bold'>{item.Comment.length ? item.Comment.length : '0'}</span> bình luận
                        </a>
                    </div>
                </div>
            </div>
            <Modal
                title="Bạn chắc chắn muốn gửi đánh giá?"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p style={{
                    fontSize: "600",
                    fontFamily: "Roboto",
                    fontSize: "larger",
                    color: "black",
                }}>Điểm đánh giá <Rate allowHalf value={rate}></Rate></p>
                <p
                    style={{
                        fontSize: "600",
                        fontFamily: "Roboto",
                        fontSize: "larger",
                        color: "black",
                    }}
                >Nội dung đánh giá </p>
                <div>
                    <textarea
                        style={{ border: "1px solid #c9bfbf", width: "100%", borderRadius: "6px", height: "100px" }}
                        onChange={(e) => setModalText(e.target.value)} />
                </div>
            </Modal>
        </div >
    )
}

export { Item }
