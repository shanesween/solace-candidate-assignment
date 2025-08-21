import db from "..";
import { advocates } from "../schema";

const firstNames = [
  "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda",
  "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
  "Thomas", "Sarah", "Christopher", "Karen", "Charles", "Nancy", "Daniel", "Lisa",
  "Matthew", "Betty", "Anthony", "Helen", "Mark", "Sandra", "Donald", "Donna",
  "Steven", "Carol", "Paul", "Ruth", "Andrew", "Sharon", "Kenneth", "Michelle",
  "Joshua", "Laura", "Kevin", "Sarah", "Brian", "Kimberly", "George", "Deborah",
  "Edward", "Dorothy", "Ronald", "Lisa", "Timothy", "Nancy", "Jason", "Karen"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas",
  "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White",
  "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young",
  "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell",
  "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker"
];

const cities = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
  "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
  "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis", "Seattle",
  "Denver", "Washington", "Boston", "El Paso", "Nashville", "Detroit", "Oklahoma City",
  "Portland", "Las Vegas", "Memphis", "Louisville", "Baltimore", "Milwaukee", "Albuquerque",
  "Tucson", "Fresno", "Mesa", "Sacramento", "Atlanta", "Kansas City", "Colorado Springs",
  "Miami", "Raleigh", "Omaha", "Long Beach", "Virginia Beach", "Oakland", "Minneapolis",
  "Tulsa", "Arlington", "Tampa", "New Orleans", "Wichita", "Cleveland", "Bakersfield"
];

const degrees = ["MD", "PhD", "MSW"];

const specialties = [
  "Bipolar",
  "LGBTQ",
  "Medication/Prescribing",
  "Suicide History/Attempts",
  "General Mental Health (anxiety, depression, stress, grief, life transitions)",
  "Men's issues",
  "Relationship Issues (family, friends, couple, etc)",
  "Trauma & PTSD",
  "Personality disorders",
  "Personal growth",
  "Substance use/abuse",
  "Pediatrics",
  "Women's issues (post-partum, infertility, family planning)",
  "Chronic pain",
  "Weight loss & nutrition",
  "Eating disorders",
  "Diabetic Diet and nutrition",
  "Coaching (leadership, career, academic and wellness)",
  "Life coaching",
  "Obsessive-compulsive disorders",
  "Neuropsychological evaluations & testing (ADHD testing)",
  "Attention and Hyperactivity (ADHD)",
  "Sleep issues",
  "Schizophrenia and psychotic disorders",
  "Learning disorders",
  "Domestic abuse",
];

const randomSpecialty = () => {
  const random1 = Math.floor(Math.random() * 24);
  const random2 = Math.floor(Math.random() * (24 - random1)) + random1 + 1;
  return specialties.slice(random1, random2);
};

export function generateRandomAdvocate() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const degree = degrees[Math.floor(Math.random() * degrees.length)];
  const specialties = randomSpecialty();
  const yearsOfExperience = Math.floor(Math.random() * 15) + 1;
  const phoneNumber = Math.floor(Math.random() * 9000000000) + 1000000000;

  return {
    firstName,
    lastName,
    city,
    degree,
    specialties,
    yearsOfExperience,
    phoneNumber
  };
}

// Generate 1000 advocates using the generateRandomAdvocate function
const advocateData = [];
for (let i = 0; i < 1000; i++) {
  advocateData.push(generateRandomAdvocate());
}

export { advocateData };
