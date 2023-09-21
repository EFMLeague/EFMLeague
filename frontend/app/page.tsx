import Navbar from "./components/navbar/navbar";

export default function Home() {
  return (
    <div>
      <div className="index">
        <div className="container">
          <div className=" row hero-area" id="hero-area">
            <div className="col">
              <div className="d-flex flex-column justify-content-center h-100 ">
                <p className="text-hero">
                  <span className="text-primary">NEW</span> COMPETITIVE
                  TOURNAMENT of :<br />
                  <span className="text-primary"> L</span>EAGUE{" "}
                  <span className="text-primary">O</span>F{" "}
                  <span className="text-primary">L</span>EGENDS
                </p>
                <p className="text-base">
                  Born from the idea of some friends and finally become reality,
                  thanks also to the support of foreigners. Place where the
                  tryhard is necessary like discord.
                </p>
              </div>
            </div>
            <div className="col">
              <div className="text-center d-flex justify-content-center align-items-center h-100 py-5 ">
                <img src="./img/logo/Logocentrato.png" height={300} alt="" />
              </div>
            </div>
          </div>
          <div className="py-5"></div>
          <div className="text-center">
            <p className="d-block text-hero ">
              <span className=" p-1">OUR</span>{" "}
              <span className="text-danger p-1">NUMBERS</span>
            </p>
            <div className="d-flex flex-wrap justify-content-center mx-auto">
              <div className="p-4 text-center mx-auto">
                <p className="text-hero">19</p>
                <p className="text-base">Subscriber</p>
              </div>
              <div className="p-4 text-center mx-auto">
                <p className="text-hero">30</p>
                <p className="text-base">games played</p>
              </div>
              <div className="p-4 text-center mx-auto">
                <p className="text-hero">43</p>
                <p className="text-base">New friends</p>
              </div>
              <div className="p-4 text-center mx-auto">
                <p className="text-hero">00</p>
                <p className="text-base">Kicked</p>
              </div>
              <div className="p-4 text-center mx-auto">
                <p className="text-hero">12</p>
                <p className="text-base">Match for week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
