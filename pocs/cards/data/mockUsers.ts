export interface User {
  id: number;
  name: string;
  dob: string;
  email: string;
  cardImage: string;
  profilePicture: string;
}

export const mockUsers: User[] = [
  {
    id: 1,
    name: "John Smith",
    dob: "1985-03-15",
    email: "john.smith@email.com",
    cardImage: "https://picsum.photos/300/190?random=101",
    profilePicture: "https://picsum.photos/120/120?random=1"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    dob: "1990-07-22",
    email: "sarah.johnson@email.com",
    cardImage: "https://picsum.photos/300/190?random=102",
    profilePicture: "https://picsum.photos/120/120?random=2"
  },
  {
    id: 3,
    name: "Mike Davis",
    dob: "1988-12-08",
    email: "mike.davis@email.com",
    cardImage: "https://picsum.photos/300/190?random=103",
    profilePicture: "https://picsum.photos/120/120?random=3"
  },
  {
    id: 4,
    name: "Emily Brown",
    dob: "1992-05-30",
    email: "emily.brown@email.com",
    cardImage: "https://picsum.photos/300/190?random=104",
    profilePicture: "https://picsum.photos/120/120?random=4"
  },
  {
    id: 5,
    name: "David Wilson",
    dob: "1987-09-14",
    email: "david.wilson@email.com",
    cardImage: "https://picsum.photos/300/190?random=105",
    profilePicture: "https://picsum.photos/120/120?random=5"
  },
  {
    id: 6,
    name: "Lisa Anderson",
    dob: "1991-11-03",
    email: "lisa.anderson@email.com",
    cardImage: "https://picsum.photos/300/190?random=106",
    profilePicture: "https://picsum.photos/120/120?random=6"
  },
  {
    id: 7,
    name: "Robert Taylor",
    dob: "1989-04-18",
    email: "robert.taylor@email.com",
    cardImage: "https://picsum.photos/300/190?random=107",
    profilePicture: "https://picsum.photos/120/120?random=7"
  },
  {
    id: 8,
    name: "Jennifer Garcia",
    dob: "1993-08-25",
    email: "jennifer.garcia@email.com",
    cardImage: "https://picsum.photos/300/190?random=108",
    profilePicture: "https://picsum.photos/120/120?random=8"
  },
  {
    id: 9,
    name: "Christopher Lee",
    dob: "1986-01-12",
    email: "christopher.lee@email.com",
    cardImage: "https://picsum.photos/300/190?random=109",
    profilePicture: "https://picsum.photos/120/120?random=9"
  },
  {
    id: 10,
    name: "Amanda Martinez",
    dob: "1994-06-07",
    email: "amanda.martinez@email.com",
    cardImage: "https://picsum.photos/300/190?random=110",
    profilePicture: "https://picsum.photos/120/120?random=10"
  }
];