const data = Array.from({ length: 120 }, (_, i) => ({
  _id: `P${String(i + 1).padStart(4, "0")}`,
  name: [
    "John Smith",
    "Jane Doe",
    "Michael Johnson",
    "Emily Davis",
    "Chris Benson",
    "Amanda Wilson",
    "David Miller",
    "Sarah Thompson",
    "James Anderson",
    "Laura Martinez",
  ][i % 10],
  dob: new Date(1950 + (i % 50), i % 12, (i % 28) + 1)
    .toISOString()
    .split("T")[0],
  address: {
    street: `${i + 100} ${
      ["Main St", "2nd Ave", "Park Blvd", "Maple Rd", "Oak St"][i % 5]
    }`,
    city: ["Atlanta", "Seattle", "Chicago", "Dallas", "Phoenix"][i % 5],
    state: ["NY", "CA", "IL", "TX", "AZ"][i % 5],
    zip: `${10000 + (i % 9000)}`,
  },
  phoneNumber: `(${100 + (i % 800)}) ${200 + (i % 600)}-${3000 + (i % 7000)}`,
  _metadata: {
    createdAt: new Date(2021, 0, 1 + (i % 30)).toISOString(),
    lastUpdatedAt: new Date(2021, 0, 1 + (i % 30)).toISOString(),
    updatedBy: "system",
  },
}));

export default data;
