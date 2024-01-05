import alanBtn from "@alan-ai/alan-sdk-web";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../actions/CartAction";
import { setHoten } from "../../actions/AlanActions";
import { setAddress } from "../../actions/AlanActions";
import { setPhone } from "../../actions/AlanActions";
import { setCity } from "../../actions/AlanActions";
import { setProvince } from "../../actions/AlanActions";
import ModalCard from "../cart/Payment/ModalCard";
import ModalPlaceOrder from "../cart/Payment/ModalPlaceOrder";

const SpeechRecognition = () => {
  const alanBtnRef = useRef({}).current;
  const [transcript, setTranscript] = useState("");
  const dispatch = useDispatch();
  const [isRecording, setIsRecording] = useState(false);
  const [recognitionTimeout, setRecognitionTimeout] = useState(null);
  const [isDivOpen, setIsDivOpen] = useState(false);
  let history = useHistory();
  const currentUrl = window.location.pathname;
  const hotenFromRedux = useSelector((state) => state.alan.hoten);
  const addressFromRedux = useSelector((state) => state.alan.address);
  const phoneFromRedux = useSelector((state) => state.alan.phone);
  const cityFromRedux = useSelector((state) => state.alan.city);
  const provinceFromRedux = useSelector((state) => state.alan.province);
  const handleConvertTextToSpeech = (text) => {
    fetch("https://api.fpt.ai/hmi/tts/v5", {
      method: "POST",
      headers: {
        // UwjLLiGpg0pCNrOBTSFI29F0cCTPDo59 Thuan
        // KLfjSmcLKcIscOC3jkieZB1LjdeUmPIo Trg
        "api-key": "UwjLLiGpg0pCNrOBTSFI29F0cCTPDo59", // Thay YOUR_API_KEY bằng API Key của bạn từ FPT.AI
        "Content-Type": "application/json",
        voice: "thuminh",
      },
      body: JSON.stringify({
        text: text, // Nội dung bạn muốn chuyển đổi thành âm thanh
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Sau khi nhận được URL âm thanh từ API, bạn có thể sử dụng nó hoặc chơi trực tiếp
        const audio = new Audio(data.async);
        audio.play();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleRecognition = () => {
    let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    recognition.lang = "vi-VI";
    recognition.continuous = false;

    let recognitionTimeout;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (e) => {
      const transcriptWithoutDiacritics1 = e.results[0][0].transcript;
      const transcriptWithoutDiacritics = transcriptWithoutDiacritics1
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/\./g, "")
        .replace(/,/g, "_");

      alanBtnRef.btnInstance.sendText(transcriptWithoutDiacritics);
      setTranscript(transcriptWithoutDiacritics1);

      // Clear the previous timeout to avoid restarting during user input
      clearTimeout(recognitionTimeout);

      // Set a new timeout for stopping recognition after 4 seconds of user inactivity
      recognitionTimeout = setTimeout(() => {
        // Check if there is any speech input
        if (!recognition.isListening) {
          // No speech input, restart recognition
          recognition.start();
        }
      }, 3000);
    };
    recognition.onend = () => {
      // Change the state when recording ends
      setIsRecording(false);
    };

    recognition.onerror = (e) => {
      console.error("Error during recognition:", e.error);
      recognition.stop();
      setIsRecording(false); // Ensure recording state is updated in case of an error
    };

    recognition.start();

    // Save the recognition instance to use it later for stopping
    alanBtnRef.recognitionInstance = recognition;
  };

  const handleCommand = (command) => {
    console.log("command:", command);
    if (command.COMMAND === "OPEN_CART") {
      // Gửi yêu cầu đến API Text to Speech của FPT.AI
      history.push("/cart");
      handleConvertTextToSpeech("Đã mở");
    } else if (command.COMMAND === "ORDER") {
      // Gửi yêu cầu đến API Text to Speech của FPT.AI
      history.push("/shippingcard");
      handleConvertTextToSpeech("Mời điền thông tin giao hàng");
    } else if (command.COMMAND === "THONG_TIN") {
      dispatch(setHoten(command.payload.name));
      console.log(command.payload.name);
      handleConvertTextToSpeech("Vui lòng cho biết địa chỉ liên lạc");
    } else if (command.COMMAND === "THONG_TIN_ADDRESS") {
      dispatch(setAddress(command.payload.address));
      handleConvertTextToSpeech("Vui lòng cho biết số điện thoại liên lạc");
    } else if (command.COMMAND === "THONG_TIN_PHONE") {
      dispatch(setPhone(command.payload.phone));
      handleConvertTextToSpeech("Vui lòng cho biết tên thành phố ");
    } else if (command.COMMAND === "THONG_TIN_CITY") {
      dispatch(setCity(command.payload.city));
      handleConvertTextToSpeech("Vui lòng cho biết tên tỉnh ");
    } else if (command.COMMAND === "THONG_TIN_PROVINCE") {
      console.log(command.COMMAND);
      dispatch(setProvince(command.payload.province));
      history.push("/placeorder");
      handleConvertTextToSpeech(
        "Vui lòng chọn phương thức thanh toán và nhấn đặt hàng"
      );
    } else if (command.COMMAND === "THEM_GIO_HANG") {
      handleConvertTextToSpeech("Thêm sản phẩm thành công");
      // Gọi hàm thêm sản phẩm vào giỏ hàng
      dispatch(addItemsToCart("6536208398f35a26590df0ab", 1));
    } else if (command.COMMAND === "THEM_GIO_HANG1") {
      handleConvertTextToSpeech("Thêm sản phẩm thành công");
      // Gọi hàm thêm sản phẩm vào giỏ hàng
      dispatch(addItemsToCart("653b39ee903ef8879d55ea43", 1));
    } else if (command.COMMAND === "NAME_PRODUCT_DETAILS") {
      handleConvertTextToSpeech("Thông tin chi tiết đã mở");
      // Gọi hàm thêm sản phẩm vào giỏ hàng
      history.push(`/product/6536208398f35a26590df0ab`);
    } else if (command.COMMAND === "NAME_PRODUCT_DETAILS1") {
      handleConvertTextToSpeech("Thông tin chi tiết đã mở");
      // Gọi hàm thêm sản phẩm vào giỏ hàng
      history.push(`/product/653b39ee903ef8879d55ea43`);
    } else {
      handleConvertTextToSpeech("Alan Không hiểu! Mời hỏi câu khác");
    }
  };

  useEffect(() => {
    alanBtnRef.btnInstance = alanBtn({
      key: "705c431ecab8f2082d043404c2630d382e956eca572e1d8b807a3e2338fdd0dc/stage", //key lấy khi đăng kí trên ALAN Studio
      onCommand: function ({ command }) {
        handleCommand(command); // Command trả về từ kịch bản trên studio
        console.log(command);
      },
    });
  }, []);

  return (
    <>
      <div className="">
        <div className="mt-[-80px]">
          {currentUrl === "/shippingcard" ? (
            <>
              <ModalCard
                hoten={hotenFromRedux}
                address={addressFromRedux}
                phone={phoneFromRedux}
                city={cityFromRedux}
                province={provinceFromRedux}
              />
              <div className=" mt-[10px]  mx-[9rem]">
                <button
                  className="w-[17rem] px-[6rem]  "
                  onClick={handleRecognition}
                >
                  <img
                    className="w-[5rem]"
                    src="https://cdn-icons-png.flaticon.com/128/3128/3128290.png"
                    alt=""
                  />
                  <div className="w-[5rem]">
                    {isRecording ? (
                      <div>Đang lắng nghe...</div>
                    ) : (
                      <p>{transcript}</p>
                    )}
                  </div>
                </button>
              </div>
            </>
          ) : currentUrl === "/modalplaceorder" ? (
            <ModalPlaceOrder
              hoten={hotenFromRedux}
              address={addressFromRedux}
              phone={phoneFromRedux}
              city={cityFromRedux}
              province={provinceFromRedux}
            />
          ) : (
            // Trường hợp mặc định hoặc xử lý khác nếu cần

            <div className="mt-[10vmax] mx-[8rem] ">
              <button
                className="w-[20rem] border mx-[15px] "
                onClick={handleRecognition}
              >
                <img
                  className="mx-[6rem] "
                  src="https://cdn-icons-png.flaticon.com/128/3128/3128290.png"
                  alt=""
                />
                <div>
                  {isRecording ? (
                    <div>Đang lắng nghe...</div>
                  ) : (
                    <p>{transcript}</p>
                  )}
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SpeechRecognition;
