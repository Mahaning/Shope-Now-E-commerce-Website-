import React from 'react'

const RatingCard=({product})=> {
  return (
    <div>
        <div
              className="card shadow-lg "
              style={{
                height: "28rem",
                borderRadius: "12px",
                marginLeft: "20px",
                width: "97%",
              }}
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row justify-content-start mb-0">
                      <div className="col-md-12">
                        <p className="rating-text"> 5/5 </p>
                      </div>
                      <div className="col-md-2 col-6 text-center mt-2 mb-2 no-padding">
                        <i className="fa fa-star fa-lg star-icon4"> </i>
                        <i className="fa fa-star-half-alt fa-lg star-icon4" />
                        <i className="far fa-star fa-lg star-icon4" />
                        <i className="far fa-star fa-lg star-icon4" />
                        <i className="far fa-star fa-lg star-icon4" />
                      </div>
                      <div className="col-md-2 col-6 no-padding">
                        <button className="review-btn">Add a review</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="row mb-3">
                      {/* <div class="col-md-12">
                          <p class="rating-text"> 5/5 </p>
                      </div>
                      <div class="col-md-7 col-6 text-center mt-2 mb-2">
                              <i class="fa fa-star fa-lg star-icon4"> </i></li>
                              <i class="fa fa-star-half-alt fa-lg star-icon4"></i></li>
                              <i class="far fa-star fa-lg star-icon4"></i></li>
                              <i class="far fa-star fa-lg star-icon4"></i></li>
                              <i class="far fa-star fa-lg star-icon4"></i></li>
                      </div>
                      <div class="col-md-5 col-6 no-padding">
                          <button class="review-btn">Add a review</button>
                      </div> */}
                      <div className="col-md-12">
                        <div className="line1" />
                      </div>
                      <div className="col-md-12">
                        <p className="reviewer-text">Amount of reviewers </p>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12" style={{ height: "30px" }}>
                        <div className="row progress-bg">
                          <div className="col-md-6 col-5">
                            <span className="rating-num mr-3"> 5 </span>
                            <i className="fa fa-star star-icon5" />
                            <span className="reviewer-num ml-3"> (25) </span>
                          </div>
                          <div className="col-md-6 col-7 mt-2">
                            <div className="progress progress-wait">
                              <div
                                className="progress-bar progress-done"
                                role="progressbar"
                                style={{ width: "25%" }}
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-md-12 mt-1"
                        style={{ height: "30px" }}
                      >
                        <div className="row">
                          <div className="col-md-6 col-5">
                            <span className="rating-num mr-3"> 4 </span>
                            <i className="far fa-star star-icon5" />
                            <span className="reviewer-num ml-3"> (6) </span>
                          </div>
                          <div className="col-md-6 col-7 mt-2">
                            <div className="progress progress-wait">
                              <div
                                className="progress-bar progress-done"
                                role="progressbar"
                                style={{ width: "60%" }}
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12" style={{ height: "30px" }}>
                        <div className="row">
                          <div className="col-md-6 col-5">
                            <span className="rating-num mr-3"> 3 </span>
                            <i className="far fa-star star-icon5" />
                            <span className="reviewer-num ml-3"> (6) </span>
                          </div>
                          <div className="col-md-6 col-7 mt-2">
                            <div className="progress progress-wait">
                              <div
                                className="progress-bar progress-done"
                                role="progressbar"
                                style={{ width: "35%" }}
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-md-12 mt-1"
                        style={{ height: "30px" }}
                      >
                        <div className="row">
                          <div className="col-md-6 col-5">
                            <span className="rating-num mr-3"> 2 </span>
                            <i className="far fa-star star-icon5" />
                            <span className="reviewer-num ml-3"> (1) </span>
                          </div>
                          <div className="col-md-6 col-7 mt-2">
                            <div className="progress progress-wait">
                              <div
                                className="progress-bar progress-done"
                                role="progressbar"
                                style={{ width: "30%" }}
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-md-12 mt-1"
                        style={{ height: "30px" }}
                      >
                        <div className="row">
                          <div className="col-md-6 col-5">
                            <span className="rating-num mr-3"> 1 </span>
                            <i className="far fa-star star-icon5" />
                            <span className="reviewer-num ml-3"> (1) </span>
                          </div>
                          <div className="col-md-6 col-7 mt-2">
                            <div className="progress progress-wait">
                              <div
                                className="progress-bar progress-done"
                                role="progressbar"
                                style={{ width: "15%" }}
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mt-3">
                    <div className="row justify-content-center">
                      <div className="col-md-9 col-9">
                        <p className="users-reviews mb-2">
                          {" "}
                          Reviews by the users
                        </p>
                      </div>
                      <div className="col-md-9 col-9">
                        <p className="users-name mb-0"> Ahmed 30 years old</p>
                      </div>
                      <div className="col-md-9 col-9">
                        <p className="star-icon6 mb-1">
                          <i className="fas fa-star star-icon6" />
                          <i className="fas fa-star star-icon6" />
                          <i className="fas fa-star star-icon6" />
                          <i className="fas fa-star star-icon6" />
                          <i className="fas fa-star star-icon6" />
                          <span className="users-stars mb-1">
                            {" "}
                            (5 stars) Reviews
                          </span>
                        </p>
                      </div>
                      <div className="col-md-9 col-9">
                        <p className="users-use mb-1">
                          {" "}
                          Product used in: office
                        </p>
                      </div>
                      <div className="col-md-9 col-9 mb-2">
                        <p className="users-recommend">
                          I liked the bags’ structure, and bought my 2nd bag wit
                          the same brand. Delivery was fast!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-12">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/get-product-image/${product._id}`}
                          className="reviewer-photo"
                          alt='ProductImage'
                        />
                        <p className="users-photo mb-1">
                          {product.productName}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
    </div>
  )
}

export default RatingCard