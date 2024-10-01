import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      name: 'John Doe',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
    },
  });

  // Create Posts
  const post1 = await prisma.post.create({
    data: {
      position: 'Frontend Developer',
      description: 'We are looking for a Frontend Developer with experience in React and TypeScript.',
      location: 'Remote',
      jobType: 'FULL_TIME',
      salary: 70000,
      hiringManager: 'Alice Johnson',
      companyName: 'Tech Solutions Ltd.',
      applicationUrl: 'https://example.com/apply-frontend',
      skillsRequired: ['React', 'TypeScript', 'CSS', 'HTML'],
      status: 'ACTIVE',
      User: { connect: { id: user1.id } }, // Connect post to user1
    },
  });

  const post2 = await prisma.post.create({
    data: {
      position: 'Backend Developer',
      description: 'We are hiring a skilled Backend Developer proficient in Node.js and MongoDB.',
      location: 'Onsite - San Francisco, CA',
      jobType: 'FULL_TIME',
      salary: 90000,
      hiringManager: 'Bob Anderson',
      companyName: 'DevOps Inc.',
      applicationUrl: 'https://example.com/apply-backend',
      skillsRequired: ['Node.js', 'MongoDB', 'Express', 'PostgreSQL'],
      status: 'ACTIVE',
      User: { connect: { id: user2.id } }, // Connect post to user2
    },
  });

  const post3 = await prisma.post.create({
    data: {
      position: 'Intern Software Engineer',
      description: 'Internship position for a software engineer. A great opportunity to learn and grow.',
      location: 'Hybrid - New York, NY',
      jobType: 'INTERNSHIP',
      salary: 30000,
      hiringManager: 'Chris Evans',
      companyName: 'Startup Hub',
      applicationUrl: 'https://example.com/apply-intern',
      skillsRequired: ['JavaScript', 'HTML', 'CSS'],
      status: 'ACTIVE',
      User: { connect: { id: user1.id } }, // Connect post to user1
    },
  });

  // Create Applicants
  await prisma.applicant.create({
    data: {
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      resume: 'https://example.com/resume-michael.pdf',
      postId: post1.id, // Apply to post1 (Frontend Developer)
    },
  });

  await prisma.applicant.create({
    data: {
      name: 'Sarah Lee',
      email: 'sarah.lee@example.com',
      resume: 'https://example.com/resume-sarah.pdf',
      postId: post2.id, // Apply to post2 (Backend Developer)
    },
  });

  await prisma.applicant.create({
    data: {
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      resume: 'https://example.com/resume-emily.pdf',
      postId: post3.id, // Apply to post3 (Intern Software Engineer)
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });