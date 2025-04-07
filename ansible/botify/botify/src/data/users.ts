import { Users } from "@/app/dashboard/users/columns";

async function getUsers(): Promise<Users[]> {
  // Function to generate a random date between two dates
  function randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  // Arrays of first and last names
  const firstNames = ["Samuel", "Alice", "Michael", "Emily", "James", "Emma", "Daniel", "Olivia", "William", "Sophia", "Benjamin", "Charlotte", "Liam", "Amelia", "Noah", "Ava", "Ethan", "Mia", "Lucas", "Isabella"];
  const lastNames = ["Yeboah", "Johnson", "Brown", "Davis", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "King"];

  // Generate 500 users
  const users = [];
  for (let i = 0; i < 500; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const botSource = "Jobmanor";
    const lastSeen = randomDate(new Date(2022, 0, 1), new Date(2023, 11, 31));

    users.push({
      id: (i + 1).toString(),
      name: `${firstName} ${lastName}`,
      email: email,
      botSource: botSource,
      lastSeen: lastSeen.toISOString() // Convert to ISO string for proper serialization
    });
  }
  return users;
}

export default getUsers;
