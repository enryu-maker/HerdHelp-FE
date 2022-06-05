import { Dimensions,Platform } from "react-native";
const { width, height } = Dimensions.get("window");
export const images ={
    logo:require("../assets/Logo/Logo01.png"),
    eye:require("../assets/Logo/eye.png"),
    eye_close:require("../assets/Logo/eye_close.png"),
    correct:require("../assets/Logo/correct.png"),
    cancel:require("../assets/Logo/cancel.png"),
    login:require("../assets/Logo/profile-user.png"),
    search:require("../assets/Logo/search.png"),
    filter:require("../assets/Logo/filter.png"),
    menu:require("../assets/Logo/menu.png"),
    bread:require("../assets/animal_logo/newborn.png"),
    purchased:require("../assets/animal_logo/cash.png"),
    back:require("../assets/Logo/previous.png"),
    home:require("../assets/Logo/home.png"),
    addanimal:require("../assets/Logo/pet-care.png"),
    med:require("../assets/Logo/first-aid-kit.png"),
    weight:require("../assets/Logo/weight-scale.png"),
    tag:require("../assets/Add/price-tag.png"),
    name:require("../assets/Add/name.png"),
    mom:require("../assets/Add/bird.png"),
    scale:require("../assets/Add/weight.png"),
    money:require("../assets/Add/money.png"),
    age:require("../assets/Add/age.png"),
    vacc:require("../assets/Add/vaccine.png"),
    thirty:require("../assets/Add/speed-limit.png"),
    dog:require("../assets/Add/breed.png"),
    disease:require("../assets/Add/disease.png"),
    medicines:require("../assets/Add/medicines.png"),
    dropper:require("../assets/Add/dropper.png"),
    withdraw:require("../assets/Add/atm.png"),
    logout:require("../assets/Logo/logout.png"),
    calender:require("../assets/Logo/calendar-2.png"),
    male:require("../assets/animal_logo/male.png"),
    female:require("../assets/animal_logo/female.png"),
    bell:require("../assets/Logo/bell.png"),
    herd:require("../assets/Logo/dog.png"),
    money:require("../assets/Logo/money.png"),
    herdhelp:require("../assets/Logo/Herd-Help-Logo.png"),
    log:require("../assets/Logo/user.png"),
    sign:require("../assets/Logo/add-user.png"),
    update:require("../assets/Logo/refresh.png"),
    aler:require("../assets/Add/alert.png"),
    clock:require("../assets/Add/clock.png"),
    mark:require("../assets/Add/mark.png"),
    HH:require("../assets/Logo/logo.png"),
    setting:require("../assets/Logo/settings.png"),
    file:require("../assets/Logo/file.png"),
    heart:require("../assets/Logo/heart.png"),
    delet:require("../assets/Logo/delete.png"),
    parents:require("../assets/Logo/family.png"),
    down:require("../assets/Logo/down.png"),
    right:require("../assets/Logo/arrow-right.png"),
    subs:require("../assets/Logo/subscription.png"),
    rightone:require("../assets/Logo/right.png"),
    paid:require("../assets/Logo/paid.png"),
    card:require("../assets/Logo/credit-cards.png"),
    sack:require("../assets/Logo/sack.png"),
    line:require("../assets/Logo/line.png"),
    mail:require("../assets/Logo/mailbox.png"),
    city:require("../assets/Logo/city.png"),
    star:require("../assets/Logo/star.png"),
    kg:require("../assets/Logo/lb.png"),
    cam:require("../assets/Logo/camera.png"),
    picture:require("../assets/Logo/picture.png"),
    add:require("../assets/Logo/add.png"),
    coin:require("../assets/Logo/coin.png"),
    gain:require("../assets/Logo/gain.png"),
    x:require("../assets/Logo/x.png"),
}
export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})
export const COLORS={
    // Primary:"rgb(126,204,122)",
    Primary:"#0DB44C",
    transparentPrimary: "#d6f5d6",
    transparentPrimary2: "#eaf7e9",
    white:"#ffffff",
    lightGray1: "#DDDDDD",
    lightGray2: "#e6e6e6",
    black:"black",
    gray: "#898B9A",
    gray2: "#BBBDC1",
    gray3: "#CFD0D7",
    darkGray: "#525C67",
    darkGray2: "#757D85",
    transparent: "transparent",
    red: "#ff4d4d",
    green: "#27AE60",
    layout:"#f0f0f0"
}

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,
    base2: 10,
    // font sizes
    largeTitle: 40,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    h5: 12,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};
const type = { base: (Platform.OS === "ios" ? "Helvetica Neue" : 'Roboto'), 
bold: (Platform.OS === "ios" ? "HelveticaNeue-Bold" : "Roboto"), 
emphasis: (Platform.OS === "ios" ? "HelveticaNeue-Italic" : "Roboto") }
export const FONTS = {
    largeTitle: { fontFamily: type.bold, fontSize: SIZES.largeTitle },
    h1: { fontFamily: type.bold, fontSize: SIZES.h1, lineHeight: 36, fontWeight:'bold'},
    h2: { fontFamily: type.bold, fontSize: SIZES.h2, lineHeight: 30 , fontWeight:'bold'},
    h3: { fontFamily: type.bold, fontSize: SIZES.h3, lineHeight: 22 , fontWeight:'bold'},
    h4: { fontFamily: type.bold, fontSize: SIZES.h4, lineHeight: 20 , fontWeight:'bold'},
    h5: { fontFamily: type.bold, fontSize: SIZES.h5, lineHeight: 18 , fontWeight:'bold'},
    body1: { fontFamily: type.base, fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily:type.base, fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily:type.base, fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily:type.base, fontSize: SIZES.body4, lineHeight: 20 },
    body5: { fontFamily:type.base, fontSize: SIZES.body5, lineHeight: 18 },
};
  export const genderdata = [
    {
      value: 'Male',
      label: 'Male',
      avatarSource:images.male
    },
    {
      value: 'Female',
      label: 'Female',
      avatarSource:images.female
    },
];
export const Bred = [
  {
    value: true,
    label: 'Yes',
    avatarSource:images.correct
  },
  {
    value: false,
    label: 'No',
    avatarSource:images.cancel
    // avatarSource:{uri:"https://longwoodgardens.org/sites/default/files/highlight_images/76758.jpg"}
  },
];
export const Bought = [
  {
    value: true,
    label: 'Yes',
    avatarSource:images.purchased
  },
  {
    value: false,
    label: 'No',
    avatarSource:images.bread
  },
];
