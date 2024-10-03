export const APP_NAME = "HealthTrackerApp";

export const CAROUSEL_DATA = [
  {
    imgName: "food",
    desc: "Track your meals and maintain a healthy diet with personalized meal planning.",
  },
  {
    imgName: "pill",
    desc: "Keep your health on track with regular medication reminders, ensuring you never skip a dose.",
  },
  {
    imgName: "sport",
    desc: "Stay healthy and strong by prioritizing good nutrition, regular activity, and self-care.",
  },
];

export const genderItems = [
  { label: "Select Gender", value: "" },
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

export const weightItems = [
  { label: "Select Weight", value: "" },
  ...Array.from({ length: 180 }, (_, i) => ({
    label: `${i + 1} kg`,
    value: `${i + 1}`,
  })),
];

export const ageItems = [
  { label: "Select Age", value: "" },
  ...Array.from({ length: 80 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  })),
];

export const heightItems = Array.from({ length: 61 }, (_, i) => {
  const heightValue = 140 + i;
  return { label: `${heightValue} cm`, value: `${heightValue}` };
});

export const MANAGEMENT_MENU = [
  {
    btnName: "Change Personal Information",
    iconType: "FontAwesome",
    iconName: "user",
    screenName: "InformationScreen",
  },
  {
    btnName: "Set Medication Reminders",
    iconType: "FontAwesome",
    iconName: "medkit",
    screenName: "MedicationReminderScreen",
  },
  {
    btnName: "Meal Planning",
    iconType: "FontAwesome",
    iconName: "cutlery",
    screenName: "MealPlanningScreen",
  },
  {
    btnName: "Doctor Appointment Reminders",
    iconType: "FontAwesome",
    iconName: "calendar",
    screenName: "DoctorAppointmentReminderScreen",
  },
  {
    btnName: "Notes",
    iconType: "FontAwesome",
    iconName: "sticky-note",
    screenName: "NotesScreen",
  },
];

export const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
