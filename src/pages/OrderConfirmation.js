import * as React from "react";

function Header() {
  return (
    <div className="flex flex-wrap gap-10 justify-between items-center w-full h-[62px] max-md:max-w-full">
      <div className="flex flex-col self-stretch my-auto w-24 text-3xl text-black whitespace-nowrap rounded-none">
        <div className="self-start">non</div>
        <div>originals</div>
      </div>
      <div className="flex gap-3 items-center self-stretch my-auto">
        <div className="flex items-center self-stretch p-2 my-auto w-10 rounded-3xl border border-black border-solid">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/2f5d1dce998b4d1e870181f6de378601/91f315619a4a4c3a8ce7bb3b3fb0efc1f1ea007a545d723da82083f686e306e2?apiKey=2f5d1dce998b4d1e870181f6de378601&"
            alt=""
            className="object-contain self-stretch my-auto w-6 aspect-square"
          />
        </div>
        <div className="flex items-center self-stretch p-2.5 my-auto w-10 h-10 bg-indigo-600 rounded-3xl border border-indigo-600 border-solid">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/2f5d1dce998b4d1e870181f6de378601/cd27f021c23ecd53ba8ac36055e1a4226eced35558d2ed111f00fba8d670a3fe?apiKey=2f5d1dce998b4d1e870181f6de378601&"
            alt=""
            className="object-contain self-stretch my-auto w-5 aspect-square"
          />
        </div>
      </div>
    </div>
  );
}

function OrderDetails() {
  return (
    <div className="flex flex-wrap gap-10 items-center w-full max-md:max-w-full">
      <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-16 min-w-[240px] max-md:max-w-full">
        <div className="flex flex-col items-start w-full text-4xl text-black max-md:max-w-full">
          <div className="gap-3">Hey Pranav!</div>
        </div>
        <div className="flex flex-col mt-4 w-full max-md:max-w-full">
          <div className="flex flex-wrap gap-1.5 items-center w-full text-2xl text-black max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/2f5d1dce998b4d1e870181f6de378601/0ee8a37be0a80b3f2fd4ecd2bd5fcb853153409fe0d023589db27c385be91b0d?apiKey=2f5d1dce998b4d1e870181f6de378601&"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
            />
            <div className="gap-3 self-stretch my-auto min-w-[240px]">
              Your order is successfully placed!
            </div>
          </div>
          <div className="mt-1.5 text-base text-neutral-400 max-md:max-w-full">
            You will also receive an email confirmation on your registered email
            id.
          </div>
        </div>
      </div>
      <button className="flex gap-2 justify-center items-center self-stretch px-8 py-4 my-auto text-base font-medium text-black border border-solid border-neutral-200 min-w-[240px] max-md:px-5">
        <span className="self-stretch my-auto">CONTINUE SHOPPING</span>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/2f5d1dce998b4d1e870181f6de378601/98b81dfaf658f5f94b5257ffa8b75beeb0076fa33ca6efe2d93511d91523f6fd?apiKey=2f5d1dce998b4d1e870181f6de378601&"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
        />
      </button>
    </div>
  );
}

function OrderProgress() {
  return (
    <>
      <ProductCard />
      <div className="flex flex-col p-4 mt-6 w-full border border-solid border-neutral-200 max-md:max-w-full">
        <div className="flex flex-col w-full max-md:max-w-full">
          <div className="text-xl font-medium text-black max-md:max-w-full">
            Whats Next?
          </div>
          <div className="mt-1.5 text-base text-neutral-600 max-md:max-w-full">
            Lorem ipsum dolor sit amet consectetur. Leo pellentesque ut interdum
            nec tristique ultrices. Leo pellentesque ut interdum nec tristique
            ultrices.
          </div>
        </div>
        <div className="flex flex-col px-9 pb-1.5 mt-6 w-full max-md:px-5 max-md:max-w-full">
          <div className="flex flex-wrap self-center max-w-full w-[612px]">
            <div className="flex items-center p-1 w-6 h-6 bg-neutral-900 rounded-[40px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/2f5d1dce998b4d1e870181f6de378601/363d0ad84d0c6514929c8d6346b30f3635ec1ebe7426879105cbc26ed38b638d?apiKey=2f5d1dce998b4d1e870181f6de378601&"
                alt=""
                className="object-contain self-stretch my-auto w-4 aspect-square"
              />
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/2f5d1dce998b4d1e870181f6de378601/033977fa71769e09cfcecd87cca23b19d993ff5d0992546be6f3eb65ebd5fefb?apiKey=2f5d1dce998b4d1e870181f6de378601&"
              alt=""
              className="object-contain shrink-0 my-auto max-w-full aspect-[166.67] w-[172px]"
            />
            <div className="flex shrink-0 py-1 w-6 h-6 bg-stone-300 rounded-[40px]" />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/2f5d1dce998b4d1e870181f6de378601/b4e28088083952aeeed7cdaa4fc3f62eb0dbcf92ab8e41b147072a573ecb99bd?apiKey=2f5d1dce998b4d1e870181f6de378601&"
              alt=""
              className="object-contain shrink-0 my-auto max-w-full aspect-[166.67] w-[172px]"
            />
            <div className="flex shrink-0 py-1 w-6 h-6 bg-stone-300 rounded-[40px]" />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/2f5d1dce998b4d1e870181f6de378601/8efb9846bec0c639491d27ee29387e7e7ae21a3bb25859824231f0fdd50ba16b?apiKey=2f5d1dce998b4d1e870181f6de378601&"
              alt=""
              className="object-contain shrink-0 my-auto max-w-full aspect-[166.67] w-[171px]"
            />
            <div className="flex shrink-0 py-1 w-6 h-6 bg-stone-300 rounded-[40px]" />
          </div>
          <div className="flex flex-wrap gap-5 justify-between items-start mt-2 w-full text-base text-zinc-500 max-md:max-w-full">
            <div className="flex flex-col text-black whitespace-nowrap">
              <div className="gap-3 w-full">Ordered</div>
            </div>
            <div className="flex-1 shrink gap-3 self-stretch text-center">
              Seller Order Confirmed
            </div>
            <div className="gap-3 whitespace-nowrap">Shipped</div>
            <div className="gap-3 whitespace-nowrap">Delivered</div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductCard() {
  return (
    <div className="flex flex-wrap gap-5 pb-4 w-full max-md:max-w-full">
      <div className="flex gap-1 my-auto min-h-[152px] w-[152px]">
        <div className="flex overflow-hidden flex-col flex-1 shrink items-center basis-0 bg-neutral-100 h-[152px] w-[152px]">
          <div className="flex relative flex-col aspect-square w-[152px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/2f5d1dce998b4d1e870181f6de378601/3b7adcb863a6b005934e69c37587bc4a96c9efa77695470514160b377e2231c1?apiKey=2f5d1dce998b4d1e870181f6de378601&"
              alt="Product background"
              className="object-cover absolute inset-0 size-full"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/2f5d1dce998b4d1e870181f6de378601/7964cc7b4c07fb90908e4c3204ca35d7197e88f5b362189495d883291dc43bef?apiKey=2f5d1dce998b4d1e870181f6de378601&"
              alt="Adidas Samba Brazil Edition"
              className="object-contain w-full aspect-square"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full">
        <div className="flex flex-col flex-1 justify-between w-full text-neutral-900 max-md:max-w-full">
          <div className="flex flex-col w-full max-md:max-w-full">
            <div className="text-base max-md:max-w-full">
              Adidas Samba Brazil Edition
            </div>
            <div className="flex gap-1.5 items-center self-start mt-2 text-xs">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/2f5d1dce998b4d1e870181f6de378601/7a3cc45f37ea738d67b7bb5840a5acf0311a9c5ede973f3dfbe62aa055f7b6cb?apiKey=2f5d1dce998b4d1e870181f6de378601&"
                alt="V2 Shoes logo"
                className="object-contain shrink-0 self-stretch my-auto w-6 rounded-3xl aspect-square"
              />
              <div className="self-stretch my-auto">Sold by V2 Shoes</div>
            </div>
          </div>
          <div className="flex flex-col mt-2.5 w-full text-base max-md:max-w-full">
            <div className="flex flex-wrap gap-1.5 items-center w-full max-md:max-w-full">
              <div className="self-stretch my-auto font-light">Size: </div>
              <div className="gap-2 self-stretch my-auto font-medium">UK 9</div>
            </div>
            <div className="flex flex-wrap gap-1.5 items-center mt-1.5 w-full max-md:max-w-full">
              <div className="self-stretch my-auto font-light">Quantity: </div>
              <div className="self-stretch my-auto font-medium">1</div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-base font-medium text-black">
          <span className="">₹</span> 3,199
        </div>
      </div>
    </div>
  );
}

function FeedbackForm() {
  return (
    <div className="flex flex-col mt-6 w-full max-md:max-w-full">
      <div className="text-2xl font-medium text-black">Help us get better!</div>
      <form className="flex flex-col mt-5 w-full max-md:max-w-full">
        <div className="flex flex-col w-full text-base max-md:max-w-full">
          <div className="flex flex-col w-full max-md:max-w-full">
            <label
              htmlFor="rating"
              className="w-full text-black max-md:max-w-full"
            >
              Based on your experience, on a scale of 1 - 5, how likely are you
              to recommend Banana Clan to your friends and family?{" "}
            </label>
            <div className="flex flex-col mt-3.5 max-w-full font-medium whitespace-nowrap text-neutral-700 w-[305px]">
              <div className="flex gap-3 items-center w-full">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className="flex-1 shrink gap-2 self-stretch px-5 py-2.5 my-auto bg-zinc-100"
                    aria-label={`Rate ${rating} out of 5`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-4 w-full max-md:max-w-full">
            <label
              htmlFor="feedback"
              className="w-full text-black max-md:max-w-full"
            >
              Anything specific you want to share with us?
            </label>
            <textarea
              id="feedback"
              className="gap-2 pt-3 pr-2 pb-16 pl-3 mt-3 w-full border border-solid border-stone-300 text-stone-300 max-md:max-w-full"
              placeholder="Lorem ipsum dolor sit amet consectetur..."
              aria-label="Share your feedback"
            />
          </div>
        </div>
        <button
          type="submit"
          className="gap-2 self-start px-5 py-3 mt-6 text-sm font-medium text-white bg-neutral-900"
        >
          SUBMIT RESPONSE
        </button>
      </form>
    </div>
  );
}

function OrderConfirmation() {
  return (
    <div className="flex overflow-hidden flex-col items-center px-20 pt-11 pb-32 bg-white max-md:px-5 max-md:pb-24">
      <div className="flex flex-col w-full max-w-[1150px] max-md:max-w-full">
        <Header />
        <div className="flex flex-col mt-20 w-full max-md:mt-10 max-md:mr-0.5 max-md:max-w-full">
          <OrderDetails />
          <div className="flex flex-wrap gap-10 items-start mt-11 w-full max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col grow shrink min-w-[240px] w-[676px] max-md:max-w-full">
              <OrderProgress />
              <FeedbackForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
