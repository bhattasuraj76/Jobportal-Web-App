export const DEFAULT_USER_AUTH = {
  email: "",
  entity: "guest",
  token: "",
};

export const DEFAULT_JOB_CATEGORIES = [
  {
    title: "IT/Computing",
    value: "IT/Computing",
  },
  {
    title: "Real Estate",
    value: "Real Estate",
  },
  {
    title: "Agriculture",
    value: "Agriculture",
  },
  {
    title: "Banking",
    value: "Banking",
  },
  {
    title: "Marketing & Sales",
    value: "Marketing & Sales",
  },
];

export const DEFAULT_JOB_TYPES = [
  {
    title: "Full Time",
    value: "Full Time",
  },
  {
    title: "Part Time",
    value: "Part Time",
  },
  {
    title: "Freelance",
    value: "Freelance",
  },
  {
    title: "Contract",
    value: "Contract",
  },
  {
    title: "Intern",
    value: "Intern",
  },
];

export const DEFAULT_JOB_LEVELS = [
  {
    title: "Senior Level",
    value: "Senior Level",
  },
  {
    title: "Mid Level",
    value: "Mid Level",
  },
  {
    title: "Entry Level",
    value: "Entry Level",
  },
];

export const DEFAULT_JOB_LOCATIONS = [
  {
    title: "Kathmandu",
    value: "Kathmandu",
  },
  {
    title: "Bhaktapur",
    value: "Bhaktapur",
  },
  {
    title: "Lalitpur",
    value: "Lalitpur",
  },
];

export const DEFAULT_SALARY_RANGES = [
  {
    title: "Below Rs. 30,000",
    value: "0-30000",
  },
  {
    title: "Rs. 30,000 to Rs.50,000",
    value: "30000-50000",
  },
  {
    title: "Rs. 50,000 to Rs.70,000",
    value: "50000-70000",
  },
  {
    title: "Above Rs.70,000",
    value: "70000-",
  },
];

export const apiPath = process.env.REACT_APP_API_URL;
