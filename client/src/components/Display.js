import React, { Component } from "react";
import { message, Card } from "antd";
import ReactImageMagnify from "react-image-magnify";
import moment from "moment";
import axios from "axios";
class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    axios({
      url: "/api/getData",
      method: "GET"
    })
      .then(res => {
        if (res.data) {
          this.setState({ data: res.data });
        }
      })
      .catch(err => {
        message.error(err);
      });
  }

  render() {
    return (
      <div
        style={{
          padding: "4% 4%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex"
        }}
      >
        <Card title="Application Data" style={{ width: "100%" }}>
          {this.state.data.length > 0 ? (
            <div style={{ display: "flex" }}>
              {this.state.data.map(obj => {
                return (
                  <div>
                    <ReactImageMagnify
                      {...{
                        smallImage: {
                          alt: "Wristwatch by Ted Baker London",
                          width: 230,
                          height: 300,
                          src: obj.image
                        },
                        largeImage: {
                          src: obj.image,
                          width: 400,
                          height: 800
                        }
                      }}
                    />
                    Amount&nbsp;:&nbsp;{obj.amount} <br />{" "}
                    Date&nbsp;:&nbsp;&nbsp; {moment(obj.date).format("lll")}
                  </div>
                );
              })}
            </div>
          ) : (
            "Not getting the data "
          )}
        </Card>
      </div>
    );
  }
}

export default BookDetail;
