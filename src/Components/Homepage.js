import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./Homepage.css";
// import InfiniteScroll from "react-infinite-scroll-component";

const PAGE_NUMBER = 1;
const CONTENT_SIZE=9;
function Homepage() {
  const [page, setpage] = useState(PAGE_NUMBER);
  const [state, setstate] = useState([]);
  const [size ,setsize] =useState(CONTENT_SIZE)

  //  useffect
  useEffect(() => {
    // making request using axios

    const getdata = async () => {
      try {
        const response = await axios.get(
          `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${size}`
        );
        // console.log(response.data.data)
        setstate(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    // calling the function
    getdata();
  }, [page]);

  //   scrollbottom function

  const scrollbottom = () => {
    setpage(page + 1);
    setsize(size + 5);
  };

  //   check if page is scroll to the bottom or not

  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      scrollbottom();
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          {state.length > 0 &&
            state.map((curr, i) => {
              const { name, hp } = curr;
              const { small } = curr.images;

              return (
                <>
                  <div key={i} className="col-lg-4">
                    <div className="box">
                      <img src={small} alt="large"></img>
                      <h4> Name:{name}</h4>
                      <h5> HP:{hp}</h5>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Homepage;
