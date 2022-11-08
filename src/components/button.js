import React from "react";
import styles from "./button.module.css";
import { useLongPress, LongPressDetectEvents } from "use-long-press";
import { useRef } from 'react';
import useDoubleClick from 'use-double-click';

const Button = () => {
  const [wobble, setWobble] = React.useState(0);
  const [single, setSingle] = React.useState(false);
  const [singleText,setSingleText] = React.useState(null);
  const [double, setDouble] = React.useState(false);
  const [longPress,setLongPress] = React.useState(false)

  const bind = useLongPress(() => {
    setSingleText(null)
    setLongPress(!longPress); setSingle(false)
  }, {
    onStart: () => {},
    onFinish: () => {setSingle(!single)},
    onCancel: () => {},
    threshold: 250,
    captureEvent: true,
    cancelOnMovement: false,
    detect: LongPressDetectEvents.MOUSE
  });

  const buttonRef = useRef();
  
  useDoubleClick({
    onSingleClick: e => {
      setWobble(1);
      setSingle(!single);
      setSingleText("Hello World")
    },
    onDoubleClick: e => {
      setSingleText(null)
      setDouble(!double);
    },
    ref: buttonRef,
    latency: 250
  });  

  return (
    <>
      <button
        ref={buttonRef}
        {...bind()}
      >
        Click
      </button>
      {single === true ? (
        <>
          <h1
            className={styles.btn}
            wobble={wobble}
            onAnimationEnd={() => {
              setWobble(0);
            }}
          >
            {singleText}
          </h1>
        </>
      ) : (
        <></>
      )}

      {double === true || longPress === true ? (
        <>
          <h1>Don't press for too long</h1>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default Button;
