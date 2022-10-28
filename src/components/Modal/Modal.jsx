import React from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import { useGetByDetailQuery } from "../../api/ApiConfig";
import "./style.css";

function ModalDetail({ showed = false, setHide, idDetail = "" }) {
  const { data, isLoading, isSuccess } = useGetByDetailQuery({
    imdbId: idDetail,
  });

  return (
    <>
      <Modal
        show={!isLoading && showed}
        onHide={setHide}
        dialogClassName="my-modal"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          <Content>
            {!isLoading && <img src={data?.Poster} />}
            <div className="title">
              <span>
                {data?.Title} ({data?.Year})
              </span>
            </div>
            <div className="ratings">
              <span>Ratings</span>
              <div className="box-wrap">
                {data?.Ratings?.length ? (
                  data?.Ratings?.map((v, i) => (
                    <div className="box-ratings">
                      <b>{v?.Source}</b>
                      <span>{v?.Value}</span>
                    </div>
                  ))
                ) : (
                  <div className="box-ratings">No Ratings</div>
                )}
              </div>
            </div>
            <div className="content">
              <div className="content-w">
                <span>Release Date :</span>
                <span>{data?.Released}</span>
              </div>
              <div className="content-w">
                <span>Rated :</span>
                <span>{data?.Rated || "-"}</span>
              </div>
              <div className="content-w">
                <span>Runtime :</span>
                <span>{data?.Runtime}</span>
              </div>
              <div className="content-w">
                <span>Imdb Votes :</span>
                <span>{data?.imdbVotes}</span>
              </div>
              <div className="content-w">
                <span>Type :</span>
                <span>{data?.Type}</span>
              </div>
              <div className="content-w">
                <span>Director :</span>
                <span>{data?.Director}</span>
              </div>
              <div className="content-w">
                <span>Genre :</span>
                <span>{data?.Genre}</span>
              </div>
              <div className="content-w">
                <span>Country :</span>
                <span>{data?.Country}</span>
              </div>
              <div className="content-w">
                <span>Awards :</span>
                <span>{data?.Awards}</span>
              </div>
              <div className="content-w">
                <span>Actors :</span>
                <span>{data?.Actors}</span>
              </div>
              <div className="content-w">
                <span>BoxOffice :</span>
                <span>{data?.BoxOffice || "-"}</span>
              </div>
              <div className="content-w">
                <span>Writer :</span>
                <span>{data?.Writer}</span>
              </div>
              <div className="content-w">
                <span>Website :</span>
                <span>{data?.Website || "-"}</span>
              </div>
            </div>
          </Content>
        </Modal.Body>
      </Modal>
    </>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  img {
    width: 100%;
    height: 300px;
    object-fit: contain;
  }

  .title {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    font-size: 24px;
  }

  .ratings {
    display: flex;
    flex-direction: column;

    .box-wrap {
      display: flex;
      justify-content: space-between;

      .box-ratings {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        height: 60px;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;

    .content-w {
      display: flex;
      gap: 10px;
    }
  }
`;

export default ModalDetail;
