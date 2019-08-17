import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;
class Navbar extends React.Component {
  render() {
    return (
      <Layout style={{ background: "transparent" }}>
        <Header
          style={{
            display: "grid",
            gridTemplateColumns: "220px auto"
          }}
        >
          <Menu
            mode="horizontal"
            theme="dark"
            style={{
              lineHeight: "64px",
              textAlign: "right"
            }}
          >
            <Menu.Item key="9">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link to="/display">Display</Link>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
  }
}

export default Navbar;
