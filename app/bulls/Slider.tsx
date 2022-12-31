"use client";

type Props = {};

const Slider = (props: Props) => {
  return (
    <div
      id="slider"
      className="slider h-fit pb-20 m-auto relative overflow-hidden w-[90%] grid place-items-center"
    >
      <div className="slide-track overflow-hidden">
        <div className="slide">
          <img src="/images/bulls/11.png" alt="" />
        </div>
        <div className="slide">
          <img src="/images/bulls/20.png" alt="" />
        </div>

        <div className="slide">
          <img src="/images/bulls/32.png" alt="" />
        </div>
        <div className="slide">
          <img src="/images/bulls/50.png" alt="" />
        </div>

        <div className="slide">
          <img src="/images/bulls/34.png" alt="" />
        </div>
        <div className="slide">
          <img src="/images/bulls/38.png" alt="" />
        </div>
        <div className="slide">
          <img src="/images/bulls/33.png" alt="" />
        </div>
        <div className="slide">
          <img src="/images/bulls/40.png" alt="" />
        </div>
        <div className="slide">
          <img src="/images/bulls/48.png" alt="" />
        </div>

        <div className="slide">
          <img src="/images/bulls/11.png" alt="" />
        </div>
        <div className="slide">
          <img src="/images/bulls/20.png" alt="" />
        </div>
        <div className="slide">
          <img src="/images/bulls/32.png" alt="" />
        </div>
        <div className="slide">
          <img src="/images/bulls/50.png" alt="" />
        </div>
        <div className="slide">
          <img src="/images/bulls/34.png" alt="" />
        </div>

        <div className="slide">
          <img src="/images/bulls/38.png" alt="" />
        </div>
        <div className="slide">
          <img src="/images/bulls/33.png" alt="" />
        </div>
        <div className="slide">
          <img src="/images/bulls/40.png" alt="" />
        </div>
        <div className="slide">
          <img src="/images/bulls/48.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
