import * as knex from "knex";

import { Role } from "@shared/contract";
import { RawUser } from "../../../../repositories/user";
import { uuidv4 } from "../../../../lib/crypto";

const adminHash =
  "$2a$10$sMG3IAuHr0rIwav4D8no4O7ecapZAxLAryGEW8TPXUIE.prFBmUgG";

// all salted hashes of shhh
const hashes = [
  "$2a$10$6rvxvobRn6al.vPVRndLNuAbrn9cGpqvWULj.dzds/BM9Ml.ph3wK",
  "$2a$10$kM7Pe31ILSfTfYCfiwZfWu4KDeBvq0KbpDn.lrz9mGPGavFglaHOe",
  "$2a$10$iRlYbDhZC/tuuMnvNeRMUuw/Eh8SLx/h.rMOoEBYsVXiS/eVVrOQS",
  "$2a$10$zm2FEiNcE/1eho.73q3MQO3IKI9haRud2RxvAs0vmxk/ak62bVn5O",
  "$2a$10$TwJ6XxNqn/4YKacTe0o2jO5nR67oUzM7g49dpEAw6BIE5RUb8WJWy",
  "$2a$10$3pfWg8hYimFnoRppcifC4OhcPAQwL/Wa5pRKa9K.SCOnuuATbNfPy",
  "$2a$10$09npp0.oketOW59OgTXba.bCgAZfHfBIBY2JqoqygrunURzX2eEn.",
  "$2a$10$FVLwxNtVHTk8s8jfIFV82expUZ3/5PSCvPZ.eJsd8jabrSwuVS1WC",
  "$2a$10$rREGiliXsWihyWIC6U6iw.965vbho/cZIfUD.1VNwk/Ny9eSyF5bS",
  "$2a$10$GEvThNpzGCAx4.n9kImtierBGAAehOSdg9oacl2w35W9tHvbQLrIa"
];

function userVariance(prefix: string) {
  return (user: RawUser): RawUser => ({
    username: `${prefix}${user.username}`,
    email: `${prefix}${user.email}`
  });
}

function createUser(username: string, hash: string): RawUser {
  return {
    id: uuidv4(),
    username,
    email: `${username}@example.com`,
    hash,
    role: Role.user,
    created_at: new Date(),
    updated_at: new Date()
  };
}

function createAdminUser(user: RawUser): RawUser {
  return { ...user, role: Role.admin };
}

export async function seed(db: knex): Promise<void> {
  const users = ["jack", "jill", "abby"]
    .map((user, i) => createUser(user, hashes[i]))
    .concat(createAdminUser(createUser("admin", adminHash)));
  return db.table("user").insert(users);
}
