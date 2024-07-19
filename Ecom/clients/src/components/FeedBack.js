import React from 'react';
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBTypography,
} from 'mdb-react-ui-kit';

function FeedBack() {
  return (
    <div className="shadow-lg">
      <style>
        {`
          .carousel-item.active,
          .carousel-item-next,
          .carousel-item-prev {
            display: flex !important;
          }
          .carousel-item-next,
          .carousel-item-prev {
            transition: transform 0.5s ease;
          }
          .carousel-item {
            flex: 1 0 33.3333%; /* Show three items at a time */
          }
          .carousel-control-prev-icon,
          .carousel-control-next-icon {
            background-color: rgba(0, 0, 0, 0.5); /* Make arrow buttons more visible */
            width: 30px;
            height: 30px;
          }
        `}
      </style>
      <MDBContainer className="py-5 shadow-lg">
        <h3 className="mb-4 text-center">Customer FeedBacks</h3>
        <p className="mb-4 pb-2 mb-md-5 pb-md-0 text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
          error amet numquam iure provident voluptate esse quasi, veritatis
          totam voluptas nostrum quisquam eum porro a pariatur veniam.
        </p>

        <MDBCarousel showControls showIndicators className="text-center">
          <MDBCarouselItem className="active">
            <MDBRow>
              <MDBCol md="4">
                <div className="d-flex justify-content-center mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                    className="rounded-circle shadow-1-strong"
                    width="150"
                    height="150"
                    alt=' img'
                  />
                </div>
                <h5 className="mb-3">Maria Smantha</h5>
                <h6 className="text-primary mb-3">Web Developer</h6>
                <p className="px-xl-3">
                  <MDBIcon fas icon="quote-left" className="pe-2" />
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quod eos id officiis hic tenetur quae quaerat ad velit ab
                  hic tenetur.
                </p>
                <MDBTypography
                  listUnStyled
                  className="d-flex justify-content-center mb-0"
                >
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon
                      fas
                      icon="star-half-alt"
                      size="sm"
                      className="text-warning"
                    />
                  </li>
                </MDBTypography>
              </MDBCol>

              <MDBCol md="4">
                <div className="d-flex justify-content-center mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                    className="rounded-circle shadow-1-strong"
                    width="150"
                    height="150"
                    alt='img'
                  />
                </div>
                <h5 className="mb-3">Lisa Cudrow</h5>
                <h6 className="text-primary mb-3">Graphic Designer</h6>
                <p className="px-xl-3">
                  <MDBIcon fas icon="quote-left" className="pe-2" />
                  Ut enim ad minima veniam, quis nostrum exercitationem ullam
                  corporis suscipit laboriosam, nisi ut aliquid commodi.
                </p>
                <MDBTypography
                  listUnStyled
                  className="d-flex justify-content-center mb-0"
                >
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                </MDBTypography>
              </MDBCol>

              <MDBCol md="4">
                <div className="d-flex justify-content-center mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
                    className="rounded-circle shadow-1-strong"
                    width="150"
                    height="150"
                    alt='img'
                  />
                </div>
                <h5 className="mb-3">John Smith</h5>
                <h6 className="text-primary mb-3">Marketing Specialist</h6>
                <p className="px-xl-3">
                  <MDBIcon fas icon="quote-left" className="pe-2" />
                  At vero eos et accusamus et iusto odio dignissimos ducimus
                  qui blanditiis praesentium voluptatum deleniti atque
                  corrupti.
                </p>
                <MDBTypography
                  listUnStyled
                  className="d-flex justify-content-center mb-0"
                >
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon far icon="star" size="sm" className="text-warning" />
                  </li>
                </MDBTypography>
              </MDBCol>
            </MDBRow>
          </MDBCarouselItem>

          <MDBCarouselItem>
            <MDBRow>
              <MDBCol md="4">
                <div className="d-flex justify-content-center mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                    className="rounded-circle shadow-1-strong"
                    width="150"
                    height="150"
                    alt='img'
                  />
                </div>
                <h5 className="mb-3">Maria Smantha</h5>
                <h6 className="text-primary mb-3">Web Developer</h6>
                <p className="px-xl-3">
                  <MDBIcon fas icon="quote-left" className="pe-2" />
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quod eos id officiis hic tenetur quae quaerat ad velit ab
                  hic tenetur.
                </p>
                <MDBTypography
                  listUnStyled
                  className="d-flex justify-content-center mb-0"
                >
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon
                      fas
                      icon="star-half-alt"
                      size="sm"
                      className="text-warning"
                    />
                  </li>
                </MDBTypography>
              </MDBCol>

              <MDBCol md="4">
                <div className="d-flex justify-content-center mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                    className="rounded-circle shadow-1-strong"
                    width="150"
                    height="150"
                    alt='img'
                  />
                </div>
                <h5 className="mb-3">Lisa Cudrow</h5>
                <h6 className="text-primary mb-3">Graphic Designer</h6>
                <p className="px-xl-3">
                  <MDBIcon fas icon="quote-left" className="pe-2" />
                  Ut enim ad minima veniam, quis nostrum exercitationem ullam
                  corporis suscipit laboriosam, nisi ut aliquid commodi.
                </p>
                <MDBTypography
                  listUnStyled
                  className="d-flex justify-content-center mb-0"
                >
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                </MDBTypography>
              </MDBCol>

              <MDBCol md="4">
                <div className="d-flex justify-content-center mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
                    className="rounded-circle shadow-1-strong"
                    width="150"
                    height="150"
                    alt='img'
                  />
                </div>
                <h5 className="mb-3">John Smith</h5>
                <h6 className="text-primary mb-3">Marketing Specialist</h6>
                <p className="px-xl-3">
                  <MDBIcon fas icon="quote-left" className="pe-2" />
                  At vero eos et accusamus et iusto odio dignissimos ducimus
                  qui blanditiis praesentium voluptatum deleniti atque
                  corrupti.
                </p>
                <MDBTypography
                  listUnStyled
                  className="d-flex justify-content-center mb-0"
                >
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon fas icon="star" size="sm" className="text-warning" />
                  </li>
                  <li>
                    <MDBIcon far icon="star" size="sm" className="text-warning" />
                  </li>
                </MDBTypography>
              </MDBCol>
            </MDBRow>
          </MDBCarouselItem>
        </MDBCarousel>
      </MDBContainer>
    </div>
  );
}

export default FeedBack;
