// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const Timer = () => {
//   const [minCount, setMinCount] = useState(24);
//   const [count, setCount] = useState(59);
//   const [paused, setPaused] = useState(true);
//   const [active, setActive] = useState('focus');
//   const [intervalId, setIntervalId] = useState(null);

//   const appendZero = (value) => (value < 10 ? `0${value}` : value);

//   const resetTime = () => {
//     pauseTimer();
//     switch (active) {
//       case 'long':
//         setMinCount(14);
//         break;
//       case 'short':
//         setMinCount(4);
//         break;
//       default:
//         setMinCount(24);
//         break;
//     }
//     setCount(59);
//   };

//   const removeFocus = () => {
//     setActive('');
//   };

//   const pauseTimer = () => {
//     setPaused(true);
//     clearInterval(intervalId);
//   };

//   const startTimer = () => {
//     resetTime();
//     setPaused(false);
//     setCount(59);
//     setIntervalId(
//       setInterval(() => {
//         setCount((prevCount) => {
//           if (prevCount === 0) {
//             if (minCount !== 0) {
//               setMinCount((prevMinCount) => prevMinCount - 1);
//               return 59;
//             } else {
//               clearInterval(intervalId);
//               return 0;
//             }
//           } else {
//             return prevCount - 1;
//           }
//         });
//       }, 1000)
//     );
//   };

//   useEffect(() => {
//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [intervalId]);

//   return {
//     minCount,
//     count,
//     paused,
//     active,
//     appendZero,
//     resetTime,
//     removeFocus,
//     pauseTimer,
//     startTimer,
//   };
// };

// export default Timer;
