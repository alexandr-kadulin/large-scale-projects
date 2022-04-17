import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { graphql } from "@apollo/client/react/hoc";
import logo from "../logo.svg";
import Controls from "./Controls";
import { CATEGORIES_QUERY } from "../queries/queries";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLinks: false,
      activeLink: 0,
      scrolling: false,
    };
    this.linksContainerRef = React.createRef();
    this.linksRef = React.createRef();
  }

  /*
	=============== 
	Sticky Navbar
	===============
	*/

  // componentDidMount() {
  //   window.addEventListener("scroll", this.handleScroll);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("scroll", this.handleScroll);
  // }

  // handleScroll() {
  //   const navbar = document.querySelector(".nav");
  //   const scrollHeight = window.scrollY;
  //   const navHeight = navbar.getBoundingClientRect().height;
  //   if (scrollHeight > navHeight) {
  //     document.body.style.paddingTop = navHeight * 2 + 160 + "px";
  //     navbar.classList.add("fixed-nav");
  //   } else {
  //     document.body.style.paddingTop = 0;
  //     navbar.classList.remove("fixed-nav");
  //   }
  // }

  componentDidUpdate() {
    const linksHeight = this.linksRef.current.getBoundingClientRect().height;

    if (this.state.showLinks) {
      this.linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      this.linksContainerRef.current.style.height = "0px";
    }
  }

  toggleLinks = () => this.setState({ showLinks: !this.state.showLinks });

  toggleActive = (index) => this.setState({ activeLink: index });

  render() {
    if (this.props.data.loading) {
      return <div className="loading"></div>;
    }
    const { categories } = this.props.data;

    return (
      <nav className="nav">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
            <Controls value={"control-small"} />
            <button className="nav-toggle" onClick={this.toggleLinks}>
              <FaBars />
            </button>
          </div>
          <div className="links-container" ref={this.linksContainerRef}>
            <ul className="links" ref={this.linksRef}>
              {categories.map((category, index) => {
                return (
                  <li
                    key={category.name + index}
                    onClick={() => this.toggleActive(index)}
                    className={`${
                      this.state.activeLink === index ? "active-category" : null
                    }`}
                  >
                    <Link to={`/category/${category.name}`}>
                      {category.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <Controls value={"control"} />
        </div>
      </nav>
    );
  }
}

export default graphql(CATEGORIES_QUERY)(Navbar);
