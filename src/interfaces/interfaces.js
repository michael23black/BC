export const ControlInterface = [
  {
    servoIndex: 6,
    leftIcon: require("../images/hand-close.png"),
    rightIcon: require("../images/hand-open.png"),
    label: "GRIP"
  },
  {
    inverse: true,
    servoIndex: 5,
    leftIcon: require("../images/w-top.png"),
    rightIcon: require("../images/w-bottom.png"),
    label: "WRIST BEND"
  },
  {
    servoIndex: 4,
    leftIcon: require("../images/rotation-left.png"),
    rightIcon: require("../images/rotation-right.png"),
    label: "WRIST ROTATION"
  },
  {
    servoIndex: 3,
    leftIcon: require("../images/e-top.png"),
    rightIcon: require("../images/e-bottom.png"),
    label: "ELBOW"
  },
  {
    inverse: true,
    servoIndex: 2,
    leftIcon: require("../images/s-top.png"),
    rightIcon: require("../images/s-bottom.png"),
    label: "SHOULDER"
  },
  {
    inverse: true,
    servoIndex: 1,
    leftIcon: require("../images/rotation-left.png"),
    rightIcon: require("../images/rotation-right.png"),
    label: "BASE"
  }
];
