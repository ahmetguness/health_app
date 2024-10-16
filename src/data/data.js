export const APP_NAME = "HealthTrackerApp";

export const CAROUSEL_DATA = [
  {
    imgName: "food",
    desc: "desc1",
  },
  {
    imgName: "pill",
    desc: "desc2",
  },
  {
    imgName: "sport",
    desc: "desc3",
  },
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
    btnName: "changePersonalInformation",
    iconType: "FontAwesome",
    iconName: "user",
    screenName: "InformationScreen",
  },
  {
    btnName: "setMedicationReminders",
    iconType: "FontAwesome",
    iconName: "medkit",
    screenName: "MedicationReminderScreen",
  },
  {
    btnName: "mealPlanning",
    iconType: "FontAwesome",
    iconName: "cutlery",
    screenName: "MealPlanningScreen",
  },
  {
    btnName: "doctorAppointmentReminders",
    iconType: "FontAwesome",
    iconName: "calendar",
    screenName: "DoctorAppointmentReminderScreen",
  },
  {
    btnName: "notes",
    iconType: "FontAwesome",
    iconName: "sticky-note",
    screenName: "NotesScreen",
  },
];

export const monthsOfYear = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const daysOfWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
