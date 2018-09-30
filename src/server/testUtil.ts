import { User, RoleKind, DrawingJSON } from "./entities";
import { SqlUser, SqlDrawing, SqlDrawingContributor } from "./repositories";
import { uuidv4 } from "./lib/crypto";

function randomRange(min: number, max: number): number {
  return Math.floor(Math.random() * max);
}

function _in<T>(x: T, xs: T[]): boolean {
  for (let i = 0; i < xs.length; i++) {
    if (x === xs[i]) {
      return true;
    }
  }
  return false;
}

function getContributors(count: number): number[] {
  const contributors: number[] = [];
  while (true) {
    if (Math.random() > 0.75) {
      return contributors;
    }

    let contributor: number;
    do {
      contributor = randomRange(0, count);
    } while (_in(contributor, contributors));
    contributors.push(contributor);
  }
}

export const testAdminUser: User = {
  id: "4b431ba4-f8c0-4aa5-a90f-5949650cfce3",
  username: "admin",
  hash: "$2a$10$sMG3IAuHr0rIwav4D8no4O7ecapZAxLAryGEW8TPXUIE.prFBmUgG",
  firstName: "jared",
  lastName: "rickert",
  role: RoleKind.admin,
  email: "admin@example.com",
  createdAt: new Date("2016-04-24T21:14:20.000Z"),
  updatedAt: new Date("2016-04-24T21:14:20.000Z")
};

export const users: User[] = [
  {
    firstName: "Marvin",
    lastName: "Golden",
    email: "metus.Aenean@nisl.ca",
    username: "Sem Vitae Aliquam LLP",
    createdAt: "2016-04-24T21:14:20.000Z",
    hash: "$2b$08$td0yamPDbZkxUPD/ONENZOh1b1Xw7SWypIJpr.tOdpG30cHS3C8Ha",
    id: "6edf13cb-f825-4f49-afad-3fb4fe60442c",
    updatedAt: "2016-04-24T21:14:20.000Z"
  },
  {
    firstName: "Yvonne",
    lastName: "Moses",
    email: "cursus.a@nibhlaciniaorci.edu",
    username: "Felis Donec PC",
    createdAt: "2018-11-24T06:51:08.000Z",
    hash: "$2b$08$kuXa7/0QWxkD4G/VCz6Nfus1QOlsSc90dy9hSCP/0U7fOIxDGUvyq",
    id: "076f7dbb-6535-46b1-819d-0744de9ec20f",
    updatedAt: "2018-11-24T06:51:08.000Z"
  },
  {
    firstName: "Rhoda",
    lastName: "Good",
    email: "Donec@milacinia.net",
    username: "Amet Incorporated",
    createdAt: "2018-03-04T20:42:09.000Z",
    hash: "$2b$08$EaPAhDxkVALRgOlmyp1wbeiQhRgQPvr.N/9YrQJoUNMb4jcM.fWsm",
    id: "6c752acd-ce7d-4189-8ecb-6106983524cf",
    updatedAt: "2018-03-04T20:42:09.000Z"
  },
  {
    firstName: "Herman",
    lastName: "Bishop",
    email: "lacus.vestibulum@maurisa.org",
    username: "Consectetuer Incorporated",
    createdAt: "2017-11-09T10:03:05.000Z",
    hash: "$2b$08$WO7Kj34bs8.FxWwoV/y3SOAoHYwIZ54Gzob13BNFiwhpIunxpjJTe",
    id: "a58b94ed-70e7-47dd-a4f6-ae30004af62b",
    updatedAt: "2017-11-09T10:03:05.000Z"
  },
  {
    firstName: "Eugenia",
    lastName: "Jennings",
    email: "libero@vulputatenisisem.edu",
    username: "Quis Diam Associates",
    createdAt: "2018-08-17T15:06:37.000Z",
    hash: "$2b$08$HSC5hjML17Bnu649mBFu/Oz0e1JnDokhSvSQoUTwmHNr6a0fDZCxO",
    id: "86ba7033-d9e6-46a7-9012-11086e03cf20",
    updatedAt: "2018-08-17T15:06:37.000Z"
  },
  {
    firstName: "Stephen",
    lastName: "Mcdaniel",
    email: "et.magna@elit.com",
    username: "Molestie Limited",
    createdAt: "2018-10-23T20:24:45.000Z",
    hash: "$2b$08$eB7ezQSXtv4utHSZEoGixurpHKrDXAYCeH2I17r.39rBHsUB9jbR6",
    id: "379c6f49-4c99-47f1-9616-344a5b27d411",
    updatedAt: "2018-10-23T20:24:45.000Z"
  },
  {
    firstName: "Colette",
    lastName: "Shields",
    email: "odio.vel.est@neque.org",
    username: "Nulla Aliquet Proin LLC",
    createdAt: "2016-07-23T11:17:14.000Z",
    hash: "$2b$08$N9IqMPTY6WENFk/DnLYmAu95KdfBv9PzccFA4LW2OUplekVTsRPRq",
    id: "b60d9a31-6770-40f2-9a28-0e82a6f60ed4",
    updatedAt: "2016-07-23T11:17:14.000Z"
  },
  {
    firstName: "Xyla",
    lastName: "Branch",
    email: "imperdiet@porttitor.net",
    username: "Quis Urna Nunc Associates",
    createdAt: "2018-03-14T10:30:39.000Z",
    hash: "$2b$08$O1zZ1b5vWN2cspgh4ZBGcO9iR/k6jJXf2egBpiaFb.Ih0ennWqQgu",
    id: "7b7a88e3-361e-437d-8da3-1160599d2744",
    updatedAt: "2018-03-14T10:30:39.000Z"
  },
  {
    firstName: "Victor",
    lastName: "Dalton",
    email: "odio@necurna.co.uk",
    username: "Malesuada Ut Incorporated",
    createdAt: "2018-12-31T08:03:45.000Z",
    hash: "$2b$08$OTR8g/mhdAcl3UAbJkE4bu80VatVrQTVlE5Hk6/mb35dC8v0TcAcO",
    id: "fc79afb3-edf4-4909-b357-5e6dadd82ad4",
    updatedAt: "2018-12-31T08:03:45.000Z"
  },
  {
    firstName: "Teagan",
    lastName: "Palmer",
    email: "augue.id@ornarefacilisis.edu",
    username: "Ultricies Industries",
    createdAt: "2018-02-13T16:38:37.000Z",
    hash: "$2b$08$uHKTapnJW682GiVOjihcBere1s8MbzP5/pIsRKYdzs8yv.d2OQFB.",
    id: "b45556b9-80d8-4acd-a909-26b786038d70",
    updatedAt: "2018-02-13T16:38:37.000Z"
  },
  {
    firstName: "Julian",
    lastName: "Bird",
    email: "lorem.eu@magnaetipsum.com",
    username: "Ipsum Cursus Inc.",
    createdAt: "2018-12-12T21:32:12.000Z",
    hash: "$2b$08$JZcR4AnjZ.V.td4fZjzxmueeBfrgYQL1qKCvLK43B4kdswdh/Wx1a",
    id: "aef4e6c9-f4b3-450c-8409-c267f4efc36d",
    updatedAt: "2018-12-12T21:32:12.000Z"
  },
  {
    firstName: "Castor",
    lastName: "Shepherd",
    email: "arcu.Vivamus.sit@purus.edu",
    username: "Vivamus Molestie Dapibus Company",
    createdAt: "2016-02-10T09:29:20.000Z",
    hash: "$2b$08$rLuiCTLR5IpXVNpDHfk2Pe1VXg/sgKhx0mjiocH38yBjyJ27cPnuG",
    id: "648e7006-1d35-4329-887c-06948bb7f152",
    updatedAt: "2016-02-10T09:29:20.000Z"
  },
  {
    firstName: "Chaney",
    lastName: "Cohen",
    email: "Sed@Vivamusrhoncus.net",
    username: "Mus Donec Company",
    createdAt: "2018-04-15T08:25:48.000Z",
    hash: "$2b$08$Cq8WWDSJNUz8797ZBQOK7.5MsfSl8UXsIATSL4YqECMO/vo.TYgHC",
    id: "4062764e-890f-4a89-b6fe-4047118c8a39",
    updatedAt: "2018-04-15T08:25:48.000Z"
  },
  {
    firstName: "Priscilla",
    lastName: "Daugherty",
    email: "Suspendisse.sagittis.Nullam@placerataugue.edu",
    username: "Et Pede LLC",
    createdAt: "2016-02-12T05:03:59.000Z",
    hash: "$2b$08$zkZ1UGrl5gCbUeHR0MUsWeezm0VxUC0Jku0Ie6nNX44W0T7EvgWEG",
    id: "08bac15a-b6ed-4fd4-83b4-e8b3a02faa0c",
    updatedAt: "2016-02-12T05:03:59.000Z"
  },
  {
    firstName: "Brian",
    lastName: "Vinson",
    email: "interdum@Donecconsectetuer.edu",
    username: "Amet Consectetuer Incorporated",
    createdAt: "2017-10-09T09:00:29.000Z",
    hash: "$2b$08$8v6uhKwK1Hv4LA12eNDwdekCAUW0WUwQtHbmWXk76rMWKS1N0WsCe",
    id: "5958b006-e551-4d5c-ae0f-a200bf79c807",
    updatedAt: "2017-10-09T09:00:29.000Z"
  },
  {
    firstName: "Uta",
    lastName: "Patrick",
    email: "torquent.per.conubia@loremvehiculaet.ca",
    username: "Erat Sed Nunc Inc.",
    createdAt: "2018-06-21T16:52:28.000Z",
    hash: "$2b$08$GTmQYnC3iCQ0ND5ziXN99epyXAEVq.1GCwamPG6gp4Kiui2JyPe0O",
    id: "f7afc645-9a6d-4e5d-9560-9d0d92789f13",
    updatedAt: "2018-06-21T16:52:28.000Z"
  },
  {
    firstName: "Zoe",
    lastName: "Whitley",
    email: "vitae.orci@erosProin.org",
    username: "Suscipit Nonummy Fusce Incorporated",
    createdAt: "2017-11-24T17:19:32.000Z",
    hash: "$2b$08$YwXxLQRkMvaF4ZWz7MZmS.2hI3PNLhCvezeqUbLm/hO.xihExNu6u",
    id: "eff11c21-1bd6-454f-b590-4ede0b05f50c",
    updatedAt: "2017-11-24T17:19:32.000Z"
  },
  {
    firstName: "Elton",
    lastName: "Estes",
    email: "nisl@ametdiam.com",
    username: "Cum Sociis Company",
    createdAt: "2018-04-04T06:44:08.000Z",
    hash: "$2b$08$xuwGT7eWk2pLqiDL6Titq.n2iGgj7X5skHbCAbdXdQzBR4M1hLCq2",
    id: "146d729c-d0e3-4948-8f4d-78cee5c472eb",
    updatedAt: "2018-04-04T06:44:08.000Z"
  },
  {
    firstName: "Olivia",
    lastName: "Hogan",
    email: "nibh.Phasellus@lacusEtiambibendum.edu",
    username: "Ut Quam Ltd",
    createdAt: "2018-11-14T19:38:19.000Z",
    hash: "$2b$08$mvI/rhuUh60HvGOZvh1ZiOm1MYCBZT1.aFG5/xYJ9VCpRwSu/FEfe",
    id: "ad981faf-ef50-40eb-9bf3-fd9ba2386abc",
    updatedAt: "2018-11-14T19:38:19.000Z"
  },
  {
    firstName: "Chiquita",
    lastName: "Gentry",
    email: "sodales.purus@vulputatenisi.com",
    username: "Dolor Ltd",
    createdAt: "2016-09-04T01:33:25.000Z",
    hash: "$2b$08$ptmGT43j1tKekuXBD/PkKOEvpnjgMoszTRJ.nCwanIUBuAvFy6.gq",
    id: "2b9123cc-38e8-4c47-a4f2-1f93a4a55759",
    updatedAt: "2016-09-04T01:33:25.000Z"
  },
  {
    firstName: "Hadley",
    lastName: "Savage",
    email: "Nulla.interdum.Curabitur@turpisegestasFusce.org",
    username: "Cras Foundation",
    createdAt: "2016-09-02T11:23:48.000Z",
    hash: "$2b$08$TJbVbvVT8i/X1xh1/6hw7eX2v9H8s9Oaf5GgPphoh93OjfZZW90LW",
    id: "584a9200-5df7-4a71-a314-f79a7202bca6",
    updatedAt: "2016-09-02T11:23:48.000Z"
  },
  {
    firstName: "Stephen",
    lastName: "Crane",
    email: "laoreet.libero.et@non.ca",
    username: "Duis Gravida Limited",
    createdAt: "2017-10-23T23:31:38.000Z",
    hash: "$2b$08$4f67iZg7Pwdj1Jp5Mk.39OApJlIKzAsXxCeN14Y0Y4iOo.PjgcOru",
    id: "1f2f311e-bd8d-4a1b-8a10-1fefe8efa5b5",
    updatedAt: "2017-10-23T23:31:38.000Z"
  },
  {
    firstName: "Ann",
    lastName: "Hudson",
    email: "enim@Aeneaneuismodmauris.edu",
    username: "Magna Corporation",
    createdAt: "2018-05-03T19:58:00.000Z",
    hash: "$2b$08$8j68uWb1gtcKiJLFhlpQnuzwFs4enWhkJQgq3z6jjnOaJwXHTNNOe",
    id: "bf2b203c-0fce-4c2c-baf4-baa027341aee",
    updatedAt: "2018-05-03T19:58:00.000Z"
  },
  {
    firstName: "Martin",
    lastName: "Fleming",
    email: "a@aenimSuspendisse.edu",
    username: "Tellus Institute",
    createdAt: "2018-07-27T07:22:32.000Z",
    hash: "$2b$08$8ww6GydhFwY.4.xrnFF8h.4R7iuQMNaRqvCiJ0to7lRzOhpeNqGmG",
    id: "3e65c2fc-1065-43f1-bc18-0bf623f3530e",
    updatedAt: "2018-07-27T07:22:32.000Z"
  },
  {
    firstName: "Samantha",
    lastName: "Knox",
    email: "dapibus.id@loremauctor.org",
    username: "Donec Institute",
    createdAt: "2016-08-13T22:01:56.000Z",
    hash: "$2b$08$KyFYh5iJwb/s2TUnK4VKwOvY3qmUUZfo85sYLPzuXtCgubmxKpkJS",
    id: "c972a328-3e8f-4ab2-80c5-961f1fa3c53a",
    updatedAt: "2016-08-13T22:01:56.000Z"
  },
  {
    firstName: "Jane",
    lastName: "Leon",
    email: "tellus.justo.sit@metusfacilisis.co.uk",
    username: "Cras Interdum Corporation",
    createdAt: "2018-07-12T06:36:26.000Z",
    hash: "$2b$08$04RvQrMegIrvvMVAxB4pJeCWWPH4sxPA6QprZt4FgU2rYOhze6HuS",
    id: "4790d163-724c-48d7-9124-d9e3cef50f22",
    updatedAt: "2018-07-12T06:36:26.000Z"
  },
  {
    firstName: "Uta",
    lastName: "Yates",
    email: "Maecenas.malesuada.fringilla@Quisque.net",
    username: "A Associates",
    createdAt: "2018-01-27T00:25:44.000Z",
    hash: "$2b$08$Tfr/twhApQiG/i72ycpEbOO6t1vT6F6.alMIp8TiTOdqrSmobMQKO",
    id: "c6bbf24f-ecb4-476a-b0bc-f5989ada16f7",
    updatedAt: "2018-01-27T00:25:44.000Z"
  },
  {
    firstName: "Price",
    lastName: "Chambers",
    email: "ligula.Donec@urnaUt.com",
    username: "Euismod Corporation",
    createdAt: "2018-05-17T21:11:32.000Z",
    hash: "$2b$08$FxY6i.giHAyv8SE3HIlPu.qgaeX1XAMGmmllaa5DEOvZ/JQ0bMtfy",
    id: "862dd90b-1d0c-4cc3-8d47-d215aeb21889",
    updatedAt: "2018-05-17T21:11:32.000Z"
  },
  {
    firstName: "Tara",
    lastName: "Howe",
    email: "Sed.auctor.odio@enimgravida.co.uk",
    username: "Sed Industries",
    createdAt: "2018-08-23T20:04:29.000Z",
    hash: "$2b$08$YneidYSN5tucll/zbZNJyOuCqmvA7DYzp/zd9uaqOdURS.OoYTs6O",
    id: "876657d6-bad7-4fc2-9e6e-4a1b0ea743c7",
    updatedAt: "2018-08-23T20:04:29.000Z"
  },
  {
    firstName: "Aquila",
    lastName: "Bullock",
    email: "nec@lacus.org",
    username: "Arcu Aliquam Ultrices Consulting",
    createdAt: "2016-07-25T03:22:13.000Z",
    hash: "$2b$08$AgeyKa9Up.whOv4ZmNUfJOIJUbVt53YBUiZQgSlDPlT42yHXG2c3y",
    id: "12542520-ead1-43f5-97c8-56a55f55632d",
    updatedAt: "2016-07-25T03:22:13.000Z"
  },
  {
    firstName: "Barry",
    lastName: "Downs",
    email: "pellentesque@tinciduntnuncac.co.uk",
    username: "Sem Egestas LLC",
    createdAt: "2018-05-19T00:57:08.000Z",
    hash: "$2b$08$pSlCOoZSgLt2sswvtAUY6.apb3gH3e3fkX3To8ebJ3A9jKn5DIGcu",
    id: "75bd2fe7-4835-46cc-bc3b-a107f678382a",
    updatedAt: "2018-05-19T00:57:08.000Z"
  },
  {
    firstName: "Hollee",
    lastName: "Daniel",
    email: "aliquet.molestie@etcommodo.org",
    username: "A Company",
    createdAt: "2018-02-19T15:23:20.000Z",
    hash: "$2b$08$0kfHWP13U/SBp.JZNq.lNOqdAEdM2/ytvdJCkRG.xOZ1QH76M7FmO",
    id: "7b515e05-7a6b-434b-a906-3af59b51b63a",
    updatedAt: "2018-02-19T15:23:20.000Z"
  },
  {
    firstName: "Preston",
    lastName: "Hicks",
    email: "ac.fermentum.vel@Nuncac.ca",
    username: "Aptent Inc.",
    createdAt: "2017-10-17T06:09:31.000Z",
    hash: "$2b$08$uwZUpw.m5OvApeDEd3akRucHbgTSBRvfDpIpOmS5YaZgNmWgE6v1y",
    id: "4ba152f4-be8b-43a3-a183-b90a9cb192d4",
    updatedAt: "2017-10-17T06:09:31.000Z"
  },
  {
    firstName: "Ina",
    lastName: "Best",
    email: "in@Quisquepurussapien.edu",
    username: "Scelerisque Scelerisque Limited",
    createdAt: "2017-11-25T03:59:48.000Z",
    hash: "$2b$08$5.pOyrH6Zs/.WAdR3UV8bezZ0Ja2lYQg70pboNK.5x/Om7TvpFGaO",
    id: "61d8cd82-d804-498b-b398-8aa84ea84070",
    updatedAt: "2017-11-25T03:59:48.000Z"
  },
  {
    firstName: "Graham",
    lastName: "Fitzpatrick",
    email: "iaculis.odio.Nam@maurisidsapien.co.uk",
    username: "Dolor Quam LLC",
    createdAt: "2018-03-04T06:16:12.000Z",
    hash: "$2b$08$Mgf6V4nsDMYvUZ0mWGq/f.o5KCcUBhs1rUsoYORI8TfO79TECWtkO",
    id: "cb94c477-e30d-4662-bce4-67ad9532cc3e",
    updatedAt: "2018-03-04T06:16:12.000Z"
  },
  {
    firstName: "Charissa",
    lastName: "Lopez",
    email: "Nulla.semper.tellus@aliquetPhasellus.org",
    username: "Quisque Tincidunt Associates",
    createdAt: "2018-04-13T22:01:23.000Z",
    hash: "$2b$08$gmkYrSqkiaP3Gy3gn.OwB.wDfJ/kJg9Rk9cestHhcg/yr4dequGdi",
    id: "a2899b0a-d9f1-4f00-8566-b93534835c25",
    updatedAt: "2018-04-13T22:01:23.000Z"
  },
  {
    firstName: "Elmo",
    lastName: "Buck",
    email: "quis.arcu.vel@nonsapienmolestie.org",
    username: "Dolor Quisque Tincidunt Corporation",
    createdAt: "2016-08-12T21:59:40.000Z",
    hash: "$2b$08$7SPhxAX6feDgBetQfMybceLWmAoYz1CwGOHN0Hld5ifyZ6EFi5oSu",
    id: "31fe845e-50f2-4ff5-8b93-986ce2ef798d",
    updatedAt: "2016-08-12T21:59:40.000Z"
  },
  {
    firstName: "Octavia",
    lastName: "Gilbert",
    email: "quis@neque.co.uk",
    username: "Lectus Ltd",
    createdAt: "2016-01-20T08:14:23.000Z",
    hash: "$2b$08$QB75pzccePcaqEZnu0XyR.9gH.AN0SDQOcKe.Pv57cSM/8hgH9aFS",
    id: "fb5e119d-8ce8-4e0e-b36e-2de3ea036040",
    updatedAt: "2016-01-20T08:14:23.000Z"
  },
  {
    firstName: "Cadman",
    lastName: "Charles",
    email: "Phasellus.libero.mauris@facilisis.ca",
    username: "Elit Nulla Facilisi Inc.",
    createdAt: "2016-02-17T02:00:33.000Z",
    hash: "$2b$08$auMzlpGMk2mm1U7XTzNC6u.Vt478V7SYZ1tLg6uoZnlscG9cDgXmi",
    id: "acf78544-2660-4ba4-a501-72714710aef5",
    updatedAt: "2016-02-17T02:00:33.000Z"
  },
  {
    firstName: "Medge",
    lastName: "Brennan",
    email: "lorem.fringilla.ornare@molestie.edu",
    username: "Rhoncus Corporation",
    createdAt: "2017-10-14T09:44:49.000Z",
    hash: "$2b$08$xpnVKruWqYnvEPpom58ur..Z2oI30R4Ng2lA7ZoqDB1QNjIFJ3y9y",
    id: "305907c2-87aa-4225-9652-37562f5405ef",
    updatedAt: "2017-10-14T09:44:49.000Z"
  },
  {
    firstName: "Garth",
    lastName: "Brewer",
    email: "ornare.facilisis.eget@ultricesiaculis.com",
    username: "Quam PC",
    createdAt: "2018-06-06T14:42:40.000Z",
    hash: "$2b$08$fJYuSBl1Y1qpOdqq.lZH8ORoappeG2.d/pPK.V5rzuQm4IjlMn8ia",
    id: "5d57347e-baff-4e15-83c8-6af9106d2e55",
    updatedAt: "2018-06-06T14:42:40.000Z"
  },
  {
    firstName: "Kirk",
    lastName: "Briggs",
    email: "eu.turpis@tristique.ca",
    username: "Scelerisque Dui Suspendisse Industries",
    createdAt: "2018-07-29T13:14:13.000Z",
    hash: "$2b$08$NwxDzmMQs.UQfPMrl5nUM.HLzHdRN7HjHBqtfowyH7POuw./q0lgO",
    id: "8a0f22d3-ec70-4209-9d07-33f626e4c7d1",
    updatedAt: "2018-07-29T13:14:13.000Z"
  },
  {
    firstName: "Moses",
    lastName: "Shepherd",
    email: "metus@Sed.org",
    username: "Vestibulum Limited",
    createdAt: "2016-08-27T09:10:18.000Z",
    hash: "$2b$08$OeP6izf4SEZp2.P0LaMMp.lxnLYCSZ/HHyCJsiGzqaUuvF0H23ABm",
    id: "a390ed14-2568-4475-8879-63e6ed1cc767",
    updatedAt: "2016-08-27T09:10:18.000Z"
  },
  {
    firstName: "Vaughan",
    lastName: "May",
    email: "Quisque@Nuncmauris.net",
    username: "Tincidunt Tempus Industries",
    createdAt: "2018-07-19T21:44:26.000Z",
    hash: "$2b$08$nbanpklqXifA0tPCR.zk5uHRkEa6PEPnJW8wvk12NucBjZhxZo80a",
    id: "07d9f8f9-408d-4d4c-a247-babd0b52df4d",
    updatedAt: "2018-07-19T21:44:26.000Z"
  },
  {
    firstName: "Eleanor",
    lastName: "Rodgers",
    email: "Duis.ac.arcu@necurna.net",
    username: "Convallis Ante Lectus LLC",
    createdAt: "2018-01-28T07:52:24.000Z",
    hash: "$2b$08$aud8xagA7Q5peApJR3bpwuCNJ9eig0N7V1SCLD1/F5ztQRthtWNTq",
    id: "af1e1dc4-3517-47c2-9a58-776919b4a0e6",
    updatedAt: "2018-01-28T07:52:24.000Z"
  },
  {
    firstName: "Gemma",
    lastName: "Marshall",
    email: "metus@Cras.co.uk",
    username: "Velit PC",
    createdAt: "2018-04-27T23:06:47.000Z",
    hash: "$2b$08$OLMimfgQea5L2/I56lNnveUGu8Py6kyjNiEWG6Dh8y9TEhPR0MKdS",
    id: "9dcc5cdc-8b49-4217-8f62-a3609cb9ddf6",
    updatedAt: "2018-04-27T23:06:47.000Z"
  },
  {
    firstName: "Unity",
    lastName: "Ferguson",
    email: "purus.Duis.elementum@consequatnecmollis.org",
    username: "Vel Mauris Foundation",
    createdAt: "2018-08-05T05:10:16.000Z",
    hash: "$2b$08$Pc3g0HXnZs4185PI5a/aUe8U.7a553OMZWttTAhfAuDVcE8gWlN9.",
    id: "a1fa3c5e-0410-434c-8143-d90d671db664",
    updatedAt: "2018-08-05T05:10:16.000Z"
  },
  {
    firstName: "Galvin",
    lastName: "Velazquez",
    email: "egestas.nunc@egestashendrerit.net",
    username: "Interdum Enim Incorporated",
    createdAt: "2018-03-30T12:42:47.000Z",
    hash: "$2b$08$KLRABIOAhEHK3LjriIfTmecbPOX.QslAQ0q5MgHltZL7nwECHjtpi",
    id: "29d8e27b-eacc-4486-bb84-ad36cb96c96b",
    updatedAt: "2018-03-30T12:42:47.000Z"
  },
  {
    firstName: "Nevada",
    lastName: "Chandler",
    email: "libero@velvulputateeu.com",
    username: "Ultricies Foundation",
    createdAt: "2016-01-14T10:18:35.000Z",
    hash: "$2b$08$A4oXZMIgHgQ7rwRSRKAaSuM9hzRRLCyc0JFBDgokg24xxuykza0zW",
    id: "a590f4f7-4a79-49a3-9c63-48d8c29fda34",
    updatedAt: "2016-01-14T10:18:35.000Z"
  },
  {
    firstName: "Reuben",
    lastName: "Hunt",
    email: "senectus@auctor.ca",
    username: "Enim LLP",
    createdAt: "2016-04-07T03:36:44.000Z",
    hash: "$2b$08$GosxCEeoGe2zKgqZIAPlu.vD5h1T0pKLtj/36AcYGNoNCG5O38l9K",
    id: "2f1e16ef-fafb-4bd7-b864-14f20d919bd7",
    updatedAt: "2016-04-07T03:36:44.000Z"
  },
  {
    firstName: "Mason",
    lastName: "Mathews",
    email: "at.velit@urnaVivamusmolestie.ca",
    username: "Turpis Aliquam Institute",
    createdAt: "2018-06-19T17:39:23.000Z",
    hash: "$2b$08$wOlHi9zzPCRfF1l1twMmluxGeSzxAkXn9y1ZPpncWkAHUJpa4Bxue",
    id: "e753581c-fde6-4711-98e1-dfcadc923d72",
    updatedAt: "2018-06-19T17:39:23.000Z"
  },
  {
    firstName: "Wynne",
    lastName: "Chase",
    email: "Donec.tincidunt.Donec@congueelit.org",
    username: "Penatibus Foundation",
    createdAt: "2018-05-24T07:31:53.000Z",
    hash: "$2b$08$n5JRfIfJYEXy07y9uFqAG.6br0T2w2Q9feOK6l8EhyEst.NjJWCqS",
    id: "63104124-3169-4505-8fcc-60b153573063",
    updatedAt: "2018-05-24T07:31:53.000Z"
  },
  {
    firstName: "Chloe",
    lastName: "Cook",
    email: "dolor.sit.amet@Vivamus.com",
    username: "In PC",
    createdAt: "2018-03-01T09:03:23.000Z",
    hash: "$2b$08$z7SF9H6KIz4yzqUA.w1Xse.jXW7zXB2D6h6nuSoXdBXLUycf5l/pe",
    id: "bfb51e83-1143-4295-a0e4-a1c730a7dbd8",
    updatedAt: "2018-03-01T09:03:23.000Z"
  },
  {
    firstName: "Fallon",
    lastName: "Stafford",
    email: "sed.dolor@enim.ca",
    username: "Viverra Donec Incorporated",
    createdAt: "2018-01-22T23:46:07.000Z",
    hash: "$2b$08$ORduuDypvjwG5m2fDL7t3.Ixrqsm5Y66XjDZWriE2HFIgEstHVq/2",
    id: "1199af5a-a409-44bb-b953-f1e5a545eff8",
    updatedAt: "2018-01-22T23:46:07.000Z"
  },
  {
    firstName: "Kristen",
    lastName: "Garza",
    email: "rhoncus.Proin.nisl@posuereatvelit.ca",
    username: "Ultrices PC",
    createdAt: "2018-04-12T21:40:37.000Z",
    hash: "$2b$08$LvfatAufDU4kFPU.Q1QCoeRhwYBJDejALKgb0Y7y13KITkuFPp5li",
    id: "6544bc35-0cac-45a4-be47-85ed4314b740",
    updatedAt: "2018-04-12T21:40:37.000Z"
  },
  {
    firstName: "TaShya",
    lastName: "Estrada",
    email: "porttitor.interdum.Sed@convallisconvallis.com",
    username: "Dolor Company",
    createdAt: "2016-06-05T05:55:31.000Z",
    hash: "$2b$08$ZEPooE9MUvbqvwSa338jaeUjlRgy0/nKk0aRP8bwB6dji99he4JdW",
    id: "62e7a682-dce6-4539-b2e1-4c5f099f653c",
    updatedAt: "2016-06-05T05:55:31.000Z"
  },
  {
    firstName: "Carson",
    lastName: "Quinn",
    email: "arcu.Sed.eu@gravidanonsollicitudin.edu",
    username: "Erat Consulting",
    createdAt: "2018-09-03T08:57:49.000Z",
    hash: "$2b$08$OymAs.Fk2TE8WMFIjqZjFOQgh8XxCH1iaH4Uf0DcL/GqoCltVqRte",
    id: "b5d4ec41-fb14-4d5a-9a6a-a3c3d41da9ad",
    updatedAt: "2018-09-03T08:57:49.000Z"
  },
  {
    firstName: "Kirby",
    lastName: "Miranda",
    email: "ac.mi.eleifend@metus.edu",
    username: "Eget Industries",
    createdAt: "2018-05-20T22:27:51.000Z",
    hash: "$2b$08$IpzMpUkmuqvadyJVP5johe7vkKJIBoBWfmyu3bKW4XcgeCDVrHmDW",
    id: "1815e631-61d7-4580-aa1b-93df5f705608",
    updatedAt: "2018-05-20T22:27:51.000Z"
  },
  {
    firstName: "Michael",
    lastName: "Harrison",
    email: "et.tristique.pellentesque@amet.net",
    username: "Fusce Mollis Duis Company",
    createdAt: "2017-11-04T14:27:00.000Z",
    hash: "$2b$08$vCDz8i7yaBKKYYTodhTi0uYNDicPuCecTKkbzQFa3.qqxLltbYAii",
    id: "c8e3d9a4-d86a-4b6c-abd5-00fe3db1aa52",
    updatedAt: "2017-11-04T14:27:00.000Z"
  },
  {
    firstName: "Matthew",
    lastName: "Atkins",
    email: "euismod.urna@at.edu",
    username: "Parturient Montes Nascetur Limited",
    createdAt: "2016-08-18T22:19:04.000Z",
    hash: "$2b$08$mEUVdwkR0hoO7RbaH6/66etPe2wtaoiyFoSd8y2uKKorU2fpV/kLy",
    id: "c1a4f9dd-5429-42ac-8161-9635173221bc",
    updatedAt: "2016-08-18T22:19:04.000Z"
  },
  {
    firstName: "Kessie",
    lastName: "Riggs",
    email: "gravida.nunc@aliquamiaculislacus.edu",
    username: "Purus Duis Company",
    createdAt: "2016-09-01T20:37:59.000Z",
    hash: "$2b$08$x6G1McV7oahUHcR1iW3ar.aHFZ8W7uF75NY.XyW5ltH8BFH08r5cC",
    id: "43c4c430-2e34-434f-baa7-5cd02581da59",
    updatedAt: "2016-09-01T20:37:59.000Z"
  },
  {
    firstName: "Omar",
    lastName: "Mccullough",
    email: "Vivamus.sit@mollis.net",
    username: "Cras Inc.",
    createdAt: "2017-09-21T02:50:14.000Z",
    hash: "$2b$08$eTRfC5mlLFga6JZ7r2AyOObJBm35.PHAIzlmdFth6LhxKTZhz9ABa",
    id: "d717b094-f459-4483-a6e9-f19810d3f825",
    updatedAt: "2017-09-21T02:50:14.000Z"
  },
  {
    firstName: "Abra",
    lastName: "Wright",
    email: "ac@Donecporttitor.edu",
    username: "Lacinia Orci PC",
    createdAt: "2016-02-27T07:04:09.000Z",
    hash: "$2b$08$ckKwTDz8iCinhGyUHF9mFur1YqxtKlx5zWqaAEP6WuFMhj6iehXQW",
    id: "0744416e-87ce-455b-8253-f90c91e77ca7",
    updatedAt: "2016-02-27T07:04:09.000Z"
  },
  {
    firstName: "Aristotle",
    lastName: "Rosales",
    email: "Nulla@facilisisvitaeorci.com",
    username: "Morbi Tristique Consulting",
    createdAt: "2018-04-21T08:43:54.000Z",
    hash: "$2b$08$miShicWNvJDtEPdxz4Qq7OEjfJWsn/zHFY4ExFyjlK0k0HySBV/BS",
    id: "2d84ceb9-b749-46f4-b15d-7c669e668651",
    updatedAt: "2018-04-21T08:43:54.000Z"
  },
  {
    firstName: "Neville",
    lastName: "Morris",
    email: "Nulla@necenim.com",
    username: "Nunc Sed Company",
    createdAt: "2018-06-13T04:41:01.000Z",
    hash: "$2b$08$WbrvaXEENt1ZhnNhiR5QaOCV6OmdJ7leEDRnWVbITWFuOG.7gzw7.",
    id: "f0c27cdb-87ef-4059-a733-4e5b39a0b037",
    updatedAt: "2018-06-13T04:41:01.000Z"
  },
  {
    firstName: "Burton",
    lastName: "Dean",
    email: "rhoncus@et.net",
    username: "Interdum Ligula Limited",
    createdAt: "2018-12-25T07:05:10.000Z",
    hash: "$2b$08$PpkWHDlez6zt7tEAEb1By.cUK8KewRiUzc4mx7pA3q7bAZwAkSiCW",
    id: "94d33faf-981f-41e8-864b-7414eee1d69d",
    updatedAt: "2018-12-25T07:05:10.000Z"
  },
  {
    firstName: "Noelani",
    lastName: "Peck",
    email: "urna@nislelementumpurus.co.uk",
    username: "Lectus Cum Ltd",
    createdAt: "2018-02-11T08:18:42.000Z",
    hash: "$2b$08$nhvBeq6x0jGx6WOkQY7n0ezQxy5TE.cLHWBUbesNC0NolAEgWYgYK",
    id: "3cc3d860-80ae-4641-92d8-e8bcf0a6e96f",
    updatedAt: "2018-02-11T08:18:42.000Z"
  },
  {
    firstName: "Skyler",
    lastName: "Russo",
    email: "sed.facilisis@DonecfringillaDonec.com",
    username: "Molestie LLP",
    createdAt: "2016-05-18T04:18:27.000Z",
    hash: "$2b$08$lWQNrrmvQyH7E7SaUGspSOPg8rXGBYCHFrRQhfP082V/rsSm9zzru",
    id: "e3749b41-ec23-4b78-bced-8ce25eef413f",
    updatedAt: "2016-05-18T04:18:27.000Z"
  },
  {
    firstName: "Leonard",
    lastName: "Vinson",
    email: "ligula@enimSuspendisse.net",
    username: "Dui Inc.",
    createdAt: "2018-02-21T01:47:57.000Z",
    hash: "$2b$08$JRYNJjmU7NrsxIt7hpw.ROwSlFLQZZ16FOJmrPejktDijgslQrKiy",
    id: "e8d84f46-bc87-47ca-9e14-caac9dac1da1",
    updatedAt: "2018-02-21T01:47:57.000Z"
  },
  {
    firstName: "Althea",
    lastName: "Barr",
    email: "at.libero@PhasellusnullaInteger.edu",
    username: "Donec Company",
    createdAt: "2018-11-29T05:51:25.000Z",
    hash: "$2b$08$mUuGXOezoaS1VqAhQ7DhkecP42MKecM9fGB9uJu0.wK3cJeyNZ9MC",
    id: "9ffebb64-a9fd-4158-8e14-e71f25065764",
    updatedAt: "2018-11-29T05:51:25.000Z"
  },
  {
    firstName: "Kristen",
    lastName: "Puckett",
    email: "mi.Aliquam@Nullamnisl.org",
    username: "Nunc Sollicitudin Commodo PC",
    createdAt: "2016-04-28T23:10:41.000Z",
    hash: "$2b$08$cNSmS0a/MqsBV9cxXK.yHOgS/GVN8ybiunVw52QgqnT86QdPWvVhG",
    id: "6654dde6-8c18-49dd-9b69-3c439741afeb",
    updatedAt: "2016-04-28T23:10:41.000Z"
  },
  {
    firstName: "Carla",
    lastName: "Serrano",
    email: "at.pede.Cras@Proinultrices.co.uk",
    username: "Enim Mi Tempor LLC",
    createdAt: "2016-06-14T17:25:46.000Z",
    hash: "$2b$08$SHZ.cvvvnHJ07U75/lZkXe7IlpG3bGb9WJYK5bvI64nMIkJDJF5Ju",
    id: "6bc215f3-b4f5-4533-9886-10b132c8c87b",
    updatedAt: "2016-06-14T17:25:46.000Z"
  },
  {
    firstName: "Chaim",
    lastName: "Sandoval",
    email: "rutrum.lorem@rutrumeuultrices.com",
    username: "Dui Quis Accumsan Foundation",
    createdAt: "2017-10-22T10:51:43.000Z",
    hash: "$2b$08$Qt6yh5LE/N.myQxXYs6n6uHMSnpO59ZGYMP0cu0v9W8NJAtt2OUJe",
    id: "b49b0115-3a0a-4e57-916c-10d8b137b2f5",
    updatedAt: "2017-10-22T10:51:43.000Z"
  },
  {
    firstName: "Hadassah",
    lastName: "Simmons",
    email: "vitae@pharetraNam.org",
    username: "Donec Corporation",
    createdAt: "2018-04-04T10:46:27.000Z",
    hash: "$2b$08$czhK93iUbGROmPwmF2M1EulOhRKpEDOSvK.zIcpIMpkim44dF0EFW",
    id: "698935d5-0531-44be-8c86-bf10fcd1110e",
    updatedAt: "2018-04-04T10:46:27.000Z"
  },
  {
    firstName: "Garrett",
    lastName: "Phillips",
    email: "semper.tellus.id@Nullamsuscipit.co.uk",
    username: "Faucibus Orci Corp.",
    createdAt: "2018-03-21T15:31:00.000Z",
    hash: "$2b$08$w0BeRpktHZlItrF.2MvkRuNhuCmXz6zV0Am6aydG4lbEDjOYunMCa",
    id: "4a93fe4a-49a8-4653-81e7-fc83160eca75",
    updatedAt: "2018-03-21T15:31:00.000Z"
  },
  {
    firstName: "Brenden",
    lastName: "Bailey",
    email: "tellus.justo@Aeneanegetmetus.co.uk",
    username: "Varius Nam Porttitor Company",
    createdAt: "2018-02-20T22:22:50.000Z",
    hash: "$2b$08$kfju96UNsiWchXnHPXFXo.BLgp8Dzpeitv4W7I37.pgJLSTxsSc8S",
    id: "9e3dfba7-0c8c-4619-95fd-2c24ffc998b7",
    updatedAt: "2018-02-20T22:22:50.000Z"
  },
  {
    firstName: "Julie",
    lastName: "Shields",
    email: "mi@egestasrhoncus.com",
    username: "Ac Foundation",
    createdAt: "2016-08-06T01:04:01.000Z",
    hash: "$2b$08$qlDJ2r.lv2dCmhnr0rCXPuzvQnI6VZAQLERCGbAlXNvRxcCL5Fp8S",
    id: "e96c2d6a-44bb-4cdb-a69c-35f6b14aaa1f",
    updatedAt: "2016-08-06T01:04:01.000Z"
  },
  {
    firstName: "Flavia",
    lastName: "Barrett",
    email: "ornare@laciniamattis.ca",
    username: "Sociis Natoque Penatibus Foundation",
    createdAt: "2018-03-28T13:59:50.000Z",
    hash: "$2b$08$r6NRZhjfPK2QGCyHSwcs3OdVckzkm5UhOH2BCouXpfj8dDv9EyxG.",
    id: "f4e360f8-8d3d-41a5-8bf1-bf59da643fdc",
    updatedAt: "2018-03-28T13:59:50.000Z"
  },
  {
    firstName: "Vanna",
    lastName: "Webb",
    email: "sit.amet@InloremDonec.ca",
    username: "Arcu Morbi Sit Consulting",
    createdAt: "2016-02-18T08:56:20.000Z",
    hash: "$2b$08$DZt/z7LCmjSEbv4CiYi8HOUEgbK7vArH39YcgW6wnXB34LHDzGuMa",
    id: "253f8651-27da-4e5f-abb6-7051aa8b3da7",
    updatedAt: "2016-02-18T08:56:20.000Z"
  },
  {
    firstName: "Driscoll",
    lastName: "Mays",
    email: "purus@estmollis.edu",
    username: "Eu Ligula Aenean Company",
    createdAt: "2018-03-02T08:21:12.000Z",
    hash: "$2b$08$gJtQeuf0KvSZwSqkPC1bQeJLAVdEBgvdPNvYnDAU1m8bTYpxZb2xO",
    id: "d419ec65-8ea8-4a11-b068-eadfda79ee3f",
    updatedAt: "2018-03-02T08:21:12.000Z"
  },
  {
    firstName: "Deborah",
    lastName: "Maddox",
    email: "mollis.dui.in@elitdictumeu.co.uk",
    username: "Mauris LLC",
    createdAt: "2017-10-15T11:57:02.000Z",
    hash: "$2b$08$SDyQfub0j5MMhjah2eGw3.hMkR.HE80ASnZjp/zOH7YvMwt7oUxJy",
    id: "8fb12071-3c33-4ccb-827a-ea716372350f",
    updatedAt: "2017-10-15T11:57:02.000Z"
  },
  {
    firstName: "Amos",
    lastName: "Hunt",
    email: "id.mollis.nec@consectetuereuismod.com",
    username: "Id Associates",
    createdAt: "2018-10-16T05:42:28.000Z",
    hash: "$2b$08$yXAiAZqpmg4FkSyDSFh1heZhf33dowy4QLQFTIdd8h9lmOjGs/b9y",
    id: "51b2e2fd-f682-4b20-98bd-41b7e07915f5",
    updatedAt: "2018-10-16T05:42:28.000Z"
  },
  {
    firstName: "Paloma",
    lastName: "Bridges",
    email: "ac.eleifend.vitae@ultriciesornareelit.com",
    username: "Quam Quis Corp.",
    createdAt: "2018-02-11T12:13:07.000Z",
    hash: "$2b$08$mNO5us5NECG5lscYvMruy.wFOGHFgZmmR980HMrX35F3bIMFJm3l.",
    id: "9c51a416-6a17-408b-bfaa-3e63fd7eb761",
    updatedAt: "2018-02-11T12:13:07.000Z"
  },
  {
    firstName: "Madeline",
    lastName: "Conner",
    email: "magna@elitfermentumrisus.com",
    username: "Dolor Quisque Corp.",
    createdAt: "2018-02-03T18:29:09.000Z",
    hash: "$2b$08$xMjDH1V0y3CCMpH8URr7zuz9OsCZ1bvqw/ytGgKQOFK0cSXmoV7vy",
    id: "9c53fd47-e5a5-4378-92f6-daaf2d83b7ab",
    updatedAt: "2018-02-03T18:29:09.000Z"
  },
  {
    firstName: "Mannix",
    lastName: "Watson",
    email: "netus.et@nonummyut.co.uk",
    username: "Ut Nulla Industries",
    createdAt: "2018-05-22T06:07:45.000Z",
    hash: "$2b$08$cmt.oRCyo0TLg8mB1lgtn.1xSv4EJrLlZjbGmIK/34G9QLjt15HpS",
    id: "2cfe87df-c41c-4d67-8abb-18785c9a8d40",
    updatedAt: "2018-05-22T06:07:45.000Z"
  },
  {
    firstName: "Travis",
    lastName: "Thompson",
    email: "et.euismod@arcu.ca",
    username: "Nam Ac Nulla LLC",
    createdAt: "2016-01-31T17:31:23.000Z",
    hash: "$2b$08$cpiWM.M6543ZqCQsx5sabessmC/0EpUTtoycOH4M/IdiBtHcovO7e",
    id: "dc95a098-40c3-4fc7-a0bc-19c2821305ec",
    updatedAt: "2016-01-31T17:31:23.000Z"
  },
  {
    firstName: "Aristotle",
    lastName: "Yates",
    email: "justo.faucibus.lectus@tristique.com",
    username: "Quis Limited",
    createdAt: "2018-09-15T09:02:04.000Z",
    hash: "$2b$08$WEjiusoZ.M6ouWASaFVQrul0saQbwJN8qZoKkgN7fxTEQzT1EJpiy",
    id: "14e0132d-c376-44dd-81aa-32553e79251e",
    updatedAt: "2018-09-15T09:02:04.000Z"
  },
  {
    firstName: "Hayfa",
    lastName: "Mccarty",
    email: "Aenean.gravida@magna.edu",
    username: "Faucibus Lectus Associates",
    createdAt: "2016-05-21T05:02:55.000Z",
    hash: "$2b$08$QeOiLNkO7hfVfSIX.t.xUeL7c4BvH104KGMpRRf/zWNcB0c08iLpq",
    id: "b198f4c1-d7fd-4cdc-a2a4-4d4a47d38e5f",
    updatedAt: "2016-05-21T05:02:55.000Z"
  },
  {
    firstName: "Ella",
    lastName: "Cortez",
    email: "lobortis.nisi@vestibulumMaurismagna.net",
    username: "Augue Malesuada Malesuada Institute",
    createdAt: "2018-07-22T22:23:37.000Z",
    hash: "$2b$08$34Irbj5YlYEHTOVaUnayCug72lHih.kC/5baBuA8J/YstdjAkVs5C",
    id: "fae17cae-69d4-42ef-9de4-14f068c18e27",
    updatedAt: "2018-07-22T22:23:37.000Z"
  },
  {
    firstName: "Hashim",
    lastName: "Cohen",
    email: "libero@liberoet.org",
    username: "Bibendum Ltd",
    createdAt: "2018-07-27T21:15:47.000Z",
    hash: "$2b$08$c1PtMphVoTTGW/eRostmv.eczaklJMtgSiJIVxo3cHDTCcXHGrkoW",
    id: "7c0ef7b8-44e8-4a26-9911-4ed5f5e2fa3c",
    updatedAt: "2018-07-27T21:15:47.000Z"
  },
  {
    firstName: "Victoria",
    lastName: "Graves",
    email: "nisl.Quisque@utlacusNulla.ca",
    username: "Neque Incorporated",
    createdAt: "2018-02-20T10:49:40.000Z",
    hash: "$2b$08$zEZJVg5aIRggaFsHz9I6kuefgW5W173zetaZxeGjoGSG0R.FHyz26",
    id: "a18692cd-9e74-4a91-80ea-dea5a0936fa8",
    updatedAt: "2018-02-20T10:49:40.000Z"
  },
  {
    firstName: "Ahmed",
    lastName: "Castaneda",
    email: "imperdiet@diam.co.uk",
    username: "Non Industries",
    createdAt: "2018-12-27T11:11:58.000Z",
    hash: "$2b$08$72h2v45UR3lVvG..EZsk4eZd5yMpKl/Ilm32lUNv3m58xqz3zLgju",
    id: "b410e0ad-87f5-43fa-94ef-e4040e805e42",
    updatedAt: "2018-12-27T11:11:58.000Z"
  },
  {
    firstName: "Carly",
    lastName: "Conley",
    email: "Donec@Duis.com",
    username: "Ipsum Suspendisse Corporation",
    createdAt: "2018-10-05T11:10:22.000Z",
    hash: "$2b$08$MGzsUx49kYlr/llp910UsuQqj/m1POAaxdGjSCXtaJjR6Cki3MJ7C",
    id: "fce0596f-929d-45a7-86d6-b4b8143ad6fb",
    updatedAt: "2018-10-05T11:10:22.000Z"
  },
  {
    firstName: "Jemima",
    lastName: "Lang",
    email: "tempor.est.ac@tinciduntaliquam.net",
    username: "Sociis Incorporated",
    createdAt: "2016-03-23T12:19:01.000Z",
    hash: "$2b$08$CekAiPkwF8fpUF8EHTwcDOCCocW2iCYC.FwKtnSjzUlWqoDj99zcG",
    id: "af64767a-c592-4235-ba87-3a10451315ae",
    updatedAt: "2016-03-23T12:19:01.000Z"
  },
  {
    firstName: "Alma",
    lastName: "Francis",
    email: "placerat.orci.lacus@lobortismaurisSuspendisse.ca",
    username: "Sem Mollis Institute",
    createdAt: "2016-04-10T18:26:00.000Z",
    hash: "$2b$08$iFosiPd0G5mPGCqqK.cTFezSEM39R6G2XBDI1Y6hjPaV.o05LJBRu",
    id: "ed8a8028-3be6-466b-8d71-b28d47deb1ac",
    updatedAt: "2016-04-10T18:26:00.000Z"
  },
  {
    firstName: "Stone",
    lastName: "Blackwell",
    email: "Nullam@varius.com",
    username: "Vitae LLC",
    createdAt: "2018-10-31T03:00:31.000Z",
    hash: "$2b$08$sd0hWYEkMqXu9c8IYp6ylOCsodjqOGfJK0KOt2z0a/3tbLzvCbRDS",
    id: "f897d123-9646-4d12-a3a4-5e84341db203",
    updatedAt: "2018-10-31T03:00:31.000Z"
  },
  {
    firstName: "Chloe",
    lastName: "Charles",
    email: "at.arcu.Vestibulum@volutpatNulladignissim.co.uk",
    username: "Fermentum Vel Mauris Inc.",
    createdAt: "2018-12-23T09:28:07.000Z",
    hash: "$2b$08$K0zuFBefiDvaLbdUUw4ueONxLPEh3i4gNt.gYmehU5nobujLMrjj6",
    id: "69938683-b251-41c0-b08d-6b26a0bfc4af",
    updatedAt: "2018-12-23T09:28:07.000Z"
  },
  {
    firstName: "Dustin",
    lastName: "Berry",
    email: "felis.eget.varius@a.org",
    username: "Orci PC",
    createdAt: "2017-10-23T04:53:59.000Z",
    hash: "$2b$08$5lNb2a3yi9OOsx9UuFhAW.Zta2ZllnqTuiwixUek6FiC4YSottMne",
    id: "6110fcee-c190-4c23-96f6-b12b2e32c547",
    updatedAt: "2017-10-23T04:53:59.000Z"
  },
  {
    firstName: "Jelani",
    lastName: "Flowers",
    email: "vehicula.risus.Nulla@blandit.org",
    username: "Metus In Institute",
    createdAt: "2016-04-24T01:45:52.000Z",
    hash: "$2b$08$bOQrsGXTd0xHTfrKSHzzouwVG9v/BXok.aPXFpgIS0Jvs7B18ho9m",
    id: "d51913e5-9af5-4cd3-8df5-724db35a878d",
    updatedAt: "2016-04-24T01:45:52.000Z"
  },
  {
    firstName: "Joel",
    lastName: "Strickland",
    email: "Etiam.laoreet.libero@Nullamfeugiatplacerat.net",
    username: "Urna Nunc Consulting",
    createdAt: "2017-12-15T20:18:01.000Z",
    hash: "$2b$08$v6ieG6pEq2YKGYvx1bI1buj93LhPLcmgB6Td1j66MExL9MGUbOw5y",
    id: "2c54f41d-39a5-4820-91c3-ce7cde44f8ea",
    updatedAt: "2017-12-15T20:18:01.000Z"
  }
].map(user => ({
  id: user.id,
  username: user.username,
  firstName: user.firstName,
  lastName: user.lastName,
  hash: user.hash,
  email: user.email,
  role: RoleKind.user,
  createdAt: new Date(user.createdAt),
  updatedAt: new Date(user.updatedAt)
}));

export const testAdminSqlUser = {
  id: testAdminUser.id,
  first_name: testAdminUser.firstName,
  last_name: testAdminUser.lastName,
  email: testAdminUser.email,
  hash: testAdminUser.hash,
  username: testAdminUser.username,
  role: testAdminUser.role,
  created_at: testAdminUser.createdAt,
  updated_at: testAdminUser.updatedAt
};

export const testSqlUsers: SqlUser[] = users.map(user => ({
  id: user.id,
  first_name: user.firstName,
  last_name: user.lastName,
  email: user.email,
  hash: user.hash,
  username: user.username,
  role: user.role,
  created_at: user.createdAt,
  updated_at: user.updatedAt
}));

export const drawings: DrawingJSON[] = [
  {
    id: "F5E57558-4275-97BD-3B42-E4D69C852725",
    name: "Varius Orci Industries",
    created_at: "2018-05-14T01:14:46-07:00"
  },
  {
    id: "2B4A1BB5-5028-3872-010D-A096D49D069A",
    name: "Eu Enim LLC",
    created_at: "2018-05-04T20:49:58-07:00"
  },
  {
    id: "055B744A-6C2E-0384-87D5-B54C1B4C7D86",
    name: "Quam Industries",
    created_at: "2019-04-24T23:38:50-07:00"
  },
  {
    id: "C32B5E46-CEB1-D04E-092F-6AE5851C0940",
    name: "Tincidunt Donec Corporation",
    created_at: "2018-04-07T22:19:57-07:00"
  },
  {
    id: "1C2E7CCA-12A4-14B8-DF9B-94169A4F7D33",
    name: "Montes Nascetur Ridiculus LLP",
    created_at: "2018-09-24T15:42:38-07:00"
  },
  {
    id: "38522D05-CC55-3FC0-5BAC-E6F9EF118EF0",
    name: "Laoreet Industries",
    created_at: "2018-02-22T03:52:21-08:00"
  },
  {
    id: "105745C3-FB51-A7D9-C754-962EE481FB57",
    name: "Sapien Nunc LLP",
    created_at: "2018-04-30T05:18:12-07:00"
  },
  {
    id: "F56A2877-CC7E-7D72-DE42-B2B86F9F6FAE",
    name: "Odio Institute",
    created_at: "2017-11-12T22:42:16-08:00"
  },
  {
    id: "5020604C-8BE5-AFE5-5346-6D6445261355",
    name: "Tempus Scelerisque LLC",
    created_at: "2017-11-14T21:08:24-08:00"
  },
  {
    id: "D34D6F20-4AA2-E524-28B1-93C2D0277587",
    name: "Gravida Aliquam Institute",
    created_at: "2019-08-03T11:41:08-07:00"
  },
  {
    id: "208C8FD3-65CD-33C6-7332-6C98C276F899",
    name: "Volutpat Foundation",
    created_at: "2019-09-08T00:48:24-07:00"
  },
  {
    id: "BC641CEF-B41D-1215-3F2E-6A7816E9AFC9",
    name: "Sapien Gravida Non Industries",
    created_at: "2018-07-29T04:09:35-07:00"
  },
  {
    id: "1B9AB7E6-794C-B416-AB62-F433F8144585",
    name: "Turpis Nec Mauris PC",
    created_at: "2019-07-25T16:05:42-07:00"
  },
  {
    id: "31D183B3-4CCD-31E7-1672-CF74E1BCE332",
    name: "Purus Duis LLC",
    created_at: "2019-07-10T12:32:39-07:00"
  },
  {
    id: "5447F0EF-9DC4-477C-E526-F03A87B02EE5",
    name: "Non Justo Proin Consulting",
    created_at: "2018-03-28T22:17:29-07:00"
  },
  {
    id: "222C127A-0D0D-F7C3-DF98-3872D1A5484E",
    name: "Tempus Risus Corporation",
    created_at: "2019-08-31T05:21:36-07:00"
  },
  {
    id: "5E461702-D02E-64A1-AD07-A094555DF8F0",
    name: "Quisque Nonummy Foundation",
    created_at: "2018-07-05T12:23:46-07:00"
  },
  {
    id: "7FE52870-9B80-99AE-6CEF-86C938736C7F",
    name: "Nonummy Ipsum Inc.",
    created_at: "2018-05-30T09:16:53-07:00"
  },
  {
    id: "5E32BB9E-4C66-47B9-599E-436BB99732BC",
    name: "Velit Eget Laoreet LLC",
    created_at: "2018-08-11T13:09:46-07:00"
  },
  {
    id: "3659D097-33B3-7A71-699C-623DBE10001A",
    name: "Tellus Sem Mollis Industries",
    created_at: "2018-08-17T05:44:05-07:00"
  },
  {
    id: "CA22ABE2-603A-793C-879C-1EA65C468726",
    name: "Massa Non Ante PC",
    created_at: "2018-11-21T12:34:34-08:00"
  },
  {
    id: "5FDA9B44-583D-08EB-3796-F7855F151C65",
    name: "Eu Elit Company",
    created_at: "2019-07-26T05:49:19-07:00"
  },
  {
    id: "F6B60FE1-1415-B1DB-156D-346F78F7F673",
    name: "In Mi Pede Associates",
    created_at: "2019-05-22T03:24:28-07:00"
  },
  {
    id: "E0F246CF-F8DF-D32B-3723-CD3EB8B633CC",
    name: "Et LLC",
    created_at: "2018-02-26T20:20:39-08:00"
  },
  {
    id: "35CEA5B6-BD0D-3F32-EDF9-2C146D5CC669",
    name: "Nec Ante Limited",
    created_at: "2018-03-17T06:23:33-07:00"
  },
  {
    id: "0E278EDB-97CE-1910-FFB4-3EF1C84DEB24",
    name: "Ridiculus Mus Incorporated",
    created_at: "2018-09-20T04:56:41-07:00"
  },
  {
    id: "7DE5BA04-F6B5-7409-079B-5BFA4C35D8B2",
    name: "Senectus Company",
    created_at: "2019-08-11T01:54:56-07:00"
  },
  {
    id: "748B7DD3-0160-8F91-4F89-71E897174952",
    name: "Laoreet Foundation",
    created_at: "2018-10-28T10:27:27-07:00"
  },
  {
    id: "512ECCC7-9760-3018-03E6-0162CEBCC392",
    name: "Vitae Erat Vivamus Incorporated",
    created_at: "2018-02-05T11:47:42-08:00"
  },
  {
    id: "5A746F78-C43C-AA1B-23E7-FBE12E3BD3B5",
    name: "Montes Corp.",
    created_at: "2018-09-06T11:54:38-07:00"
  },
  {
    id: "DD674F09-DF45-92F4-DBE0-562B24C9EB77",
    name: "Felis Nulla Tempor LLP",
    created_at: "2019-03-23T05:28:06-07:00"
  },
  {
    id: "1AEBC41C-2D7D-B610-B834-93CEFA0475F3",
    name: "Eros Inc.",
    created_at: "2019-08-09T18:25:03-07:00"
  },
  {
    id: "F8AF27EB-8CC6-EAF0-EEB7-DBA2CAC6A4BE",
    name: "Elementum Dui Inc.",
    created_at: "2017-10-09T16:17:10-07:00"
  },
  {
    id: "47168CC6-4102-00C3-18D9-E1C1C12EC72D",
    name: "Consectetuer Euismod Est Consulting",
    created_at: "2019-02-03T17:24:12-08:00"
  },
  {
    id: "3BFDB7D0-3201-6C47-D755-68DD4E5C6E3F",
    name: "Blandit Enim Consequat Company",
    created_at: "2018-08-17T14:08:50-07:00"
  },
  {
    id: "34886576-05B3-ABF7-45AE-7F27DE561F80",
    name: "Ultrices Iaculis Odio Company",
    created_at: "2018-12-07T20:51:30-08:00"
  },
  {
    id: "ACA9F045-71BC-CD3C-E4F9-0866FA20F20A",
    name: "Fames Ac Turpis LLC",
    created_at: "2018-08-13T07:34:17-07:00"
  },
  {
    id: "AB2AE15A-3BA7-729E-E989-CB06454D1523",
    name: "Lectus Foundation",
    created_at: "2018-12-22T16:43:01-08:00"
  },
  {
    id: "8A5D67E3-E6AE-BD4E-29B6-6DBC0244AFD4",
    name: "Proin Sed Turpis Inc.",
    created_at: "2018-07-07T13:43:20-07:00"
  },
  {
    id: "939B08B4-C85F-F199-FEBD-2E9F0AC7FC16",
    name: "Semper Nam Institute",
    created_at: "2019-01-07T01:50:47-08:00"
  },
  {
    id: "FE9B4638-CE88-253D-372C-6BDF90FAA03B",
    name: "Vel Venenatis Foundation",
    created_at: "2019-09-06T04:54:01-07:00"
  },
  {
    id: "F3D230F8-24F0-A824-E0D9-B7B32CDC1B2F",
    name: "Ut Industries",
    created_at: "2018-09-08T21:25:00-07:00"
  },
  {
    id: "E7D82B34-719F-8ADC-DAC3-8BF9E2071CE4",
    name: "Nunc Id Enim Associates",
    created_at: "2017-10-09T17:53:17-07:00"
  },
  {
    id: "BD857304-600F-6595-BE4D-503829FF7C0D",
    name: "Tincidunt Adipiscing Mauris LLC",
    created_at: "2018-10-25T13:10:27-07:00"
  },
  {
    id: "23E36D22-3A69-BEC3-7F11-DAB51C9D7FC7",
    name: "Penatibus Limited",
    created_at: "2018-04-02T13:37:27-07:00"
  },
  {
    id: "4553D6EA-25FC-7761-A12C-B6382202E04A",
    name: "Congue In Scelerisque Corporation",
    created_at: "2018-05-25T16:55:49-07:00"
  },
  {
    id: "22609243-FFFE-FEFC-D428-61D787940305",
    name: "Luctus Aliquet Odio Institute",
    created_at: "2019-09-15T17:42:42-07:00"
  },
  {
    id: "A6A02BC7-02A9-2439-EC1C-2ADD8B0B0399",
    name: "Laoreet Libero PC",
    created_at: "2018-02-01T22:11:07-08:00"
  },
  {
    id: "AB76BD79-4027-F211-935D-BD287BEE0097",
    name: "Posuere Incorporated",
    created_at: "2019-05-17T10:22:59-07:00"
  },
  {
    id: "C4C9FF4F-188F-FA9C-2456-A4B30B18605B",
    name: "Pede Ac Urna Associates",
    created_at: "2018-09-03T04:28:39-07:00"
  },
  {
    id: "DDA38798-97FB-4785-DDAA-31126580F2F0",
    name: "Sed Leo Cras Company",
    created_at: "2019-03-11T05:03:55-07:00"
  },
  {
    id: "6D780D7C-460E-62B9-314F-7A9097F0A6F3",
    name: "Aliquam Erat Volutpat Consulting",
    created_at: "2018-07-24T00:30:01-07:00"
  },
  {
    id: "E6DEB940-FADA-8C46-BBEE-A7757DFDF30D",
    name: "Ante LLP",
    created_at: "2019-09-22T06:36:53-07:00"
  },
  {
    id: "845B591A-93BD-4ED8-1B3D-46A4908409C3",
    name: "Duis LLC",
    created_at: "2018-08-05T18:44:33-07:00"
  },
  {
    id: "6CA38ABA-DD09-6780-1EA3-863CBFC40B45",
    name: "Risus In Industries",
    created_at: "2018-09-03T22:42:57-07:00"
  },
  {
    id: "DFE02122-EA7C-EE83-2C78-005183AFF3CC",
    name: "Augue Porttitor Interdum Corporation",
    created_at: "2017-11-03T01:55:52-07:00"
  },
  {
    id: "C4A58557-5B11-B7EA-A8C4-9890CF698811",
    name: "Ornare Elit Elit LLC",
    created_at: "2018-05-01T14:03:22-07:00"
  },
  {
    id: "833B69F9-3190-6B08-F082-EE1AFE327907",
    name: "Purus Nullam Scelerisque Corp.",
    created_at: "2018-03-21T07:37:25-07:00"
  },
  {
    id: "1AD06FFC-1151-F788-EF24-7943B9A72E35",
    name: "Eget Magna Industries",
    created_at: "2019-07-21T06:36:51-07:00"
  },
  {
    id: "51D90AF9-E206-7769-CBAB-4CD6BD932D54",
    name: "Dignissim Pharetra Consulting",
    created_at: "2018-03-23T00:55:01-07:00"
  },
  {
    id: "7D517C88-995E-CED3-C0F4-DF6E629C8491",
    name: "Mi Ac Mattis LLC",
    created_at: "2018-12-11T08:02:08-08:00"
  },
  {
    id: "E7BA4735-03F7-7606-916F-1DABCEE360D0",
    name: "Tempus Lorem Corporation",
    created_at: "2017-10-29T15:40:37-07:00"
  },
  {
    id: "C6F56C92-4D75-2252-7602-92109F148FD6",
    name: "Metus Vitae Velit Consulting",
    created_at: "2018-06-19T15:24:13-07:00"
  },
  {
    id: "290B1F0C-76C8-4915-ED67-22A0C0EAFCC4",
    name: "Auctor Ullamcorper LLC",
    created_at: "2019-05-27T19:46:42-07:00"
  },
  {
    id: "405677F9-427F-6E40-AF8C-F03C6C83E8A5",
    name: "Suscipit Consulting",
    created_at: "2019-09-30T09:56:00-07:00"
  },
  {
    id: "C214E289-84FA-322C-FD45-55AC3BF6C8F8",
    name: "Hendrerit Incorporated",
    created_at: "2019-08-21T08:57:02-07:00"
  },
  {
    id: "63FEE5B1-1802-FF4E-A607-A68EA604D7F7",
    name: "Faucibus Lectus A Ltd",
    created_at: "2019-09-27T19:58:12-07:00"
  },
  {
    id: "EE238C7A-1C13-4F01-9DCE-5C7CEDF7FFE3",
    name: "Et Foundation",
    created_at: "2018-03-26T19:30:46-07:00"
  },
  {
    id: "FDB46B93-15FF-176D-6325-1A52F2445692",
    name: "Orci Lacus Industries",
    created_at: "2018-02-05T05:13:24-08:00"
  },
  {
    id: "985DF941-162B-9768-E6AE-88B63E77CF65",
    name: "Sit Amet Risus Associates",
    created_at: "2018-02-06T19:59:20-08:00"
  },
  {
    id: "CE8F8851-55BC-8571-64DD-3774975730D1",
    name: "Et Malesuada Inc.",
    created_at: "2017-11-20T10:11:12-08:00"
  },
  {
    id: "BC5CD13C-9AED-8C96-B7E4-5C05276AC748",
    name: "Ipsum Sodales Purus Company",
    created_at: "2018-09-04T00:24:05-07:00"
  },
  {
    id: "9D4AD6F1-8346-7551-A6AE-FDBD3B19CA42",
    name: "Netus Et Malesuada Associates",
    created_at: "2019-07-10T11:20:44-07:00"
  },
  {
    id: "8F0CCC9F-6A4D-B8CF-485C-4F9AF25C5B56",
    name: "Et Tristique Ltd",
    created_at: "2019-03-12T06:54:12-07:00"
  },
  {
    id: "3DFABC98-4214-A1BC-4C96-EF6563DBDFD2",
    name: "In Faucibus Inc.",
    created_at: "2019-07-10T14:07:17-07:00"
  },
  {
    id: "6726500A-009A-CBBA-69AB-8BE6A2D69408",
    name: "Curae; LLC",
    created_at: "2018-09-07T12:10:05-07:00"
  },
  {
    id: "E9B47313-95F4-01F1-6E06-FE5DE5696402",
    name: "Nisl Elementum Foundation",
    created_at: "2019-02-21T18:12:18-08:00"
  },
  {
    id: "A3218FBC-5AC2-A6BE-E692-3D016EC004CA",
    name: "Cursus Corporation",
    created_at: "2019-03-28T22:30:47-07:00"
  },
  {
    id: "66552079-8046-51BA-EB99-60FFCE0DD197",
    name: "Non Leo Associates",
    created_at: "2018-02-09T21:04:18-08:00"
  },
  {
    id: "D5BF0999-01C8-72E7-54C9-8DA5DD658725",
    name: "Arcu Company",
    created_at: "2017-11-24T20:55:48-08:00"
  },
  {
    id: "F9BA1D25-01CD-C19A-57CE-91E4AB87BD28",
    name: "Mauris Ut Limited",
    created_at: "2019-04-15T07:50:16-07:00"
  },
  {
    id: "11EAE20A-1211-00AD-A8A2-65849DF0D177",
    name: "A Foundation",
    created_at: "2019-07-25T13:51:02-07:00"
  },
  {
    id: "7F29EF0F-4FBD-BA0E-CECA-DB8E14EAE682",
    name: "Mauris Inc.",
    created_at: "2019-01-01T20:09:19-08:00"
  },
  {
    id: "A90A2D70-8326-00FB-9DDE-4DD66E8E9FD4",
    name: "Lobortis Limited",
    created_at: "2018-05-17T07:35:06-07:00"
  },
  {
    id: "47429BC2-78D0-DDDE-B7B6-E4B9C0588553",
    name: "Felis Eget PC",
    created_at: "2018-08-29T14:49:05-07:00"
  },
  {
    id: "3034FD71-8198-3CEE-5304-E9624CF8212E",
    name: "Risus Donec LLC",
    created_at: "2019-09-22T17:01:08-07:00"
  },
  {
    id: "891BDF6A-E984-2B3C-DC3A-90105D29E87D",
    name: "Cum Sociis Natoque Limited",
    created_at: "2019-07-15T15:41:00-07:00"
  },
  {
    id: "FFCA307C-3445-F75C-18EB-83C631A2FFD2",
    name: "Cras PC",
    created_at: "2019-02-18T12:36:51-08:00"
  },
  {
    id: "522EBE57-EB1F-C435-E6C1-033F6D17F636",
    name: "Sed Consulting",
    created_at: "2017-10-27T14:47:08-07:00"
  },
  {
    id: "3316EBCB-420E-8A39-A5FE-7887CA232B22",
    name: "Turpis Aliquam Associates",
    created_at: "2018-06-22T14:24:11-07:00"
  },
  {
    id: "749DFFE6-54EF-F844-3B46-66EC47116D6E",
    name: "Dictum Cursus LLP",
    created_at: "2018-09-30T14:01:40-07:00"
  },
  {
    id: "2E4E1F80-9865-FEDC-4E52-08ECEBDCA1B5",
    name: "In LLC",
    created_at: "2018-02-14T05:28:11-08:00"
  },
  {
    id: "07C2EDF3-3530-1ACD-BB31-EBEDD7CFAFC5",
    name: "Odio A Purus Industries",
    created_at: "2018-05-09T08:02:07-07:00"
  },
  {
    id: "D84FE67B-CB16-95D2-8A8E-EF45D5E1E009",
    name: "Diam Vel Company",
    created_at: "2018-11-14T19:00:15-08:00"
  },
  {
    id: "1EBD956B-A7FB-B642-AF04-942FBF366D74",
    name: "Neque Sed Consulting",
    created_at: "2018-11-14T17:52:24-08:00"
  },
  {
    id: "1021D064-3625-C267-58D1-BE916AEC36AB",
    name: "Enim Sed Nulla Ltd",
    created_at: "2019-09-29T12:27:44-07:00"
  },
  {
    id: "61F3FADE-6799-8FA4-773B-A2EE34217B01",
    name: "Fusce Consulting",
    created_at: "2018-11-17T01:26:35-08:00"
  },
  {
    id: "C421943A-7B9F-4663-7516-5DD76BDD350B",
    name: "Proin Vel Ltd",
    created_at: "2017-10-28T03:15:59-07:00"
  },
  {
    id: "AF81BB12-BD90-C888-933D-A200471887D7",
    name: "Odio Etiam Ligula Company",
    created_at: "2019-07-30T10:10:42-07:00"
  },
  {
    id: "D13CD40F-B2CE-F730-BDB0-C5A93B4FC8DE",
    name: "Orci Phasellus Dapibus LLP",
    created_at: "2017-11-25T22:16:53-08:00"
  },
  {
    id: "2CF5FC3D-0257-32E1-F720-2437342B69C6",
    name: "Mollis Non Inc.",
    created_at: "2017-12-20T09:07:34-08:00"
  },
  {
    id: "E7E62F39-B932-9188-ED7F-E64C80B30A97",
    name: "Faucibus Leo In Incorporated",
    created_at: "2019-02-16T11:50:40-08:00"
  },
  {
    id: "F9D5D76B-F4F6-CD0B-1FC7-43E329F90323",
    name: "Metus In Lorem Limited",
    created_at: "2019-09-20T07:35:16-07:00"
  },
  {
    id: "8D43AE42-5858-5C5E-3B4A-401697A42817",
    name: "Sit Institute",
    created_at: "2018-12-19T17:07:20-08:00"
  },
  {
    id: "56E8EFD6-29CF-7273-508E-676A232781CA",
    name: "A Aliquet Vel Ltd",
    created_at: "2019-07-09T22:32:48-07:00"
  },
  {
    id: "9E2C9FD9-8E08-3D3B-9C2D-37BD1DDEED97",
    name: "Velit Eget Laoreet Corporation",
    created_at: "2018-08-31T14:54:05-07:00"
  },
  {
    id: "8852D121-F3BD-7D13-21AB-76EBE91D15D1",
    name: "Id Libero Donec LLC",
    created_at: "2019-09-19T18:28:56-07:00"
  },
  {
    id: "5E9FF72E-F7B6-68A8-5B83-00024A49E062",
    name: "Morbi Associates",
    created_at: "2019-07-26T16:02:06-07:00"
  },
  {
    id: "3B50C1D0-6292-E964-A744-B537C1DD1E1F",
    name: "Hendrerit Id Ante Ltd",
    created_at: "2018-09-18T02:28:10-07:00"
  },
  {
    id: "3E431922-68A6-0D0F-55B9-86153B7098A5",
    name: "Gravida Sagittis Duis PC",
    created_at: "2019-08-27T21:22:00-07:00"
  },
  {
    id: "6D941C3C-BE2F-DFE3-BE1A-AF621CAD8ED4",
    name: "Auctor Non Feugiat Incorporated",
    created_at: "2017-11-04T15:06:01-07:00"
  },
  {
    id: "9A3C8A42-254D-6164-C799-F829CF1E0ECB",
    name: "Ipsum Inc.",
    created_at: "2019-02-04T17:55:49-08:00"
  },
  {
    id: "78F893CC-25DB-7B7E-DA67-F3C1ADA4A766",
    name: "Aliquet Proin Velit Incorporated",
    created_at: "2019-03-30T15:03:15-07:00"
  },
  {
    id: "DE409901-C0BB-AD59-6113-F336B4EA2A9B",
    name: "Adipiscing Inc.",
    created_at: "2019-05-24T06:01:38-07:00"
  },
  {
    id: "0672B2B1-76CD-BAB8-2502-FE90C900DFED",
    name: "Vel Mauris Integer LLC",
    created_at: "2018-06-06T05:24:26-07:00"
  },
  {
    id: "46FF7F6C-5AF5-7BE6-A51F-9AFBD6DBB386",
    name: "Vivamus Non Lorem Ltd",
    created_at: "2018-05-23T02:17:45-07:00"
  },
  {
    id: "942829E4-1C14-E87E-4C80-C6B4A9B09F9F",
    name: "Metus PC",
    created_at: "2017-12-31T12:33:54-08:00"
  },
  {
    id: "D8A40145-2A08-21BA-B354-DCE4298E0FA9",
    name: "Nam Consequat Consulting",
    created_at: "2018-02-11T13:22:11-08:00"
  },
  {
    id: "53C001AC-A720-93ED-FFBF-6EA51FBE1B9A",
    name: "Inceptos Ltd",
    created_at: "2017-10-11T04:25:58-07:00"
  },
  {
    id: "5C869D8C-7C94-F156-8AAC-C05617182259",
    name: "Fringilla Donec Feugiat Inc.",
    created_at: "2019-09-06T02:00:47-07:00"
  },
  {
    id: "A198F922-8FF6-6AF2-E96C-F8CDB50BB5FB",
    name: "Nulla Integer Urna Consulting",
    created_at: "2019-09-30T12:29:36-07:00"
  },
  {
    id: "A6DC00E8-1254-208C-1101-576886BB6DAF",
    name: "Integer Aliquam Adipiscing Industries",
    created_at: "2018-10-19T04:15:06-07:00"
  },
  {
    id: "FDA14CE6-E261-F196-5D0C-06177C930AB1",
    name: "Integer Aliquam Ltd",
    created_at: "2018-05-28T10:38:55-07:00"
  },
  {
    id: "35478581-17B8-7307-82D7-58A3EB651291",
    name: "Pellentesque Eget Dictum LLP",
    created_at: "2019-08-09T09:52:39-07:00"
  },
  {
    id: "A2D5EC37-BE75-9EAB-7434-F4AC0461ECD1",
    name: "Erat Sed Company",
    created_at: "2018-01-07T03:38:01-08:00"
  },
  {
    id: "85FA0C8C-AC5F-A724-57A1-BAD7798247FC",
    name: "Orci Lobortis Augue Foundation",
    created_at: "2018-01-05T00:17:30-08:00"
  },
  {
    id: "D152C915-3DEF-D4E7-0C26-7B418ACEBECA",
    name: "Morbi Incorporated",
    created_at: "2018-07-02T17:35:23-07:00"
  },
  {
    id: "76DD693B-743B-713C-CB6B-258459A6C667",
    name: "Ipsum Phasellus LLP",
    created_at: "2018-10-15T02:09:10-07:00"
  },
  {
    id: "8463F018-F75F-F1C8-2719-59F672355134",
    name: "Vehicula Et Corp.",
    created_at: "2018-10-14T16:12:28-07:00"
  },
  {
    id: "9743B20C-CBD2-365C-42E8-AA2F6527FC7A",
    name: "Placerat Incorporated",
    created_at: "2018-06-29T05:44:43-07:00"
  },
  {
    id: "DEC5B5D8-E08C-C828-5BB6-CE931B45EBF9",
    name: "Phasellus Elit Pede Consulting",
    created_at: "2018-04-21T22:09:54-07:00"
  },
  {
    id: "BCC93FEF-406C-F0C5-A711-83A7B0C4BBDF",
    name: "Neque Morbi Incorporated",
    created_at: "2019-07-15T00:25:45-07:00"
  },
  {
    id: "9DB4768E-611D-C1D4-D439-87F602410933",
    name: "Gravida Corporation",
    created_at: "2019-09-25T01:43:14-07:00"
  },
  {
    id: "DA5C45AC-29E1-7ADE-5816-A736181C331A",
    name: "Eu Eros Nam Inc.",
    created_at: "2017-11-28T02:46:38-08:00"
  },
  {
    id: "4F2EEBD7-C7AE-B152-BDE9-81C64296630E",
    name: "Eget Company",
    created_at: "2019-03-10T09:54:37-07:00"
  },
  {
    id: "2C546BB2-60A1-F4CB-1048-CF2E034D14F1",
    name: "Proin Sed Turpis Corporation",
    created_at: "2019-08-18T12:54:18-07:00"
  },
  {
    id: "8A02E87E-737C-D6B9-02E7-FF8984C2AA4E",
    name: "Ipsum Suspendisse Inc.",
    created_at: "2019-05-18T13:06:51-07:00"
  },
  {
    id: "EA25E68B-F133-6953-C155-5AAFCDBB8261",
    name: "Ut Pellentesque Foundation",
    created_at: "2018-01-29T09:57:44-08:00"
  },
  {
    id: "AA3E3695-71CA-D753-E238-5FA393D15104",
    name: "Vestibulum Ut Corporation",
    created_at: "2019-03-31T00:21:07-07:00"
  },
  {
    id: "C2DE441C-0B1A-4704-922E-79F50863A355",
    name: "Facilisis Facilisis Corporation",
    created_at: "2019-07-20T12:59:54-07:00"
  },
  {
    id: "6E9E62AB-9AAD-FD6B-128A-F5B6FD500DB7",
    name: "Imperdiet Dictum Magna Consulting",
    created_at: "2019-04-26T22:08:18-07:00"
  },
  {
    id: "F1314384-C478-F569-5A9A-41A4C4E1E23C",
    name: "Amet Massa Ltd",
    created_at: "2018-02-24T14:03:37-08:00"
  },
  {
    id: "6E4AEBFB-FCCD-2227-B439-CADB412B805D",
    name: "Adipiscing Enim Company",
    created_at: "2019-07-18T16:19:13-07:00"
  },
  {
    id: "8B8F93DC-89BA-9530-9A9B-F9C58CA0E42B",
    name: "Egestas Rhoncus Proin Company",
    created_at: "2019-06-20T14:56:41-07:00"
  },
  {
    id: "75021D14-A90A-2DCD-0CAD-EC4C645AE669",
    name: "Sit Consulting",
    created_at: "2018-02-20T17:34:03-08:00"
  },
  {
    id: "3E2FA7FA-8E8A-087C-1499-40BB2ABA37DC",
    name: "Ac Nulla Incorporated",
    created_at: "2018-11-19T15:12:30-08:00"
  },
  {
    id: "58E8620C-BF67-C11D-F6E7-AFADD34343B8",
    name: "Lectus Incorporated",
    created_at: "2018-05-17T19:21:39-07:00"
  },
  {
    id: "E5FA5827-6971-A3BE-AFCF-3CA05BEE5F72",
    name: "Nulla Eu Industries",
    created_at: "2018-10-06T17:16:46-07:00"
  },
  {
    id: "45FE70AA-36FC-53AA-2F33-AB6B5DD525AF",
    name: "Rutrum Non Inc.",
    created_at: "2018-09-26T05:01:14-07:00"
  },
  {
    id: "B04AC1A5-BBD0-43A2-CDCE-F51BE44BB116",
    name: "Diam PC",
    created_at: "2018-05-22T09:46:35-07:00"
  },
  {
    id: "0BE8BBEE-86FD-6D80-2202-40404F208DB4",
    name: "Donec Inc.",
    created_at: "2017-11-27T20:22:19-08:00"
  },
  {
    id: "C5180D1A-50EA-DE11-1100-BA66E627251A",
    name: "Vulputate Eu Odio Corporation",
    created_at: "2017-10-03T11:13:08-07:00"
  },
  {
    id: "6EAC6E51-077A-0435-A36E-1E81232CCF9E",
    name: "Feugiat PC",
    created_at: "2019-02-09T23:03:11-08:00"
  },
  {
    id: "898F685B-F57B-490F-761F-16A47CD520C2",
    name: "Erat Volutpat Nulla Incorporated",
    created_at: "2018-11-24T20:49:05-08:00"
  },
  {
    id: "39C3A8B3-34C9-2086-AAD8-5947B8EB58DE",
    name: "Sodales Elit LLP",
    created_at: "2018-08-31T22:42:16-07:00"
  },
  {
    id: "A3253966-9C51-7492-BA23-28A6B4E3425A",
    name: "Purus Accumsan Limited",
    created_at: "2019-05-31T12:12:29-07:00"
  },
  {
    id: "414A743A-9DF5-B353-30D6-281025E79C5F",
    name: "Dolor Sit Corporation",
    created_at: "2017-11-23T23:25:24-08:00"
  },
  {
    id: "3CA3F460-AB3A-90FB-1620-D27A07F47C91",
    name: "Sit PC",
    created_at: "2019-07-28T22:03:35-07:00"
  },
  {
    id: "8181A4C8-ED65-0088-13A2-12B664D9755A",
    name: "Mauris Rhoncus Id Inc.",
    created_at: "2018-10-30T17:27:50-07:00"
  },
  {
    id: "11A6CD97-3AE6-D9A2-5443-9D8EE4CFA708",
    name: "Faucibus Morbi Vehicula Ltd",
    created_at: "2019-04-24T05:06:32-07:00"
  },
  {
    id: "99A29703-F85A-9CD2-B220-86D3B2F3FA5B",
    name: "Vivamus Euismod LLP",
    created_at: "2019-02-25T11:11:37-08:00"
  },
  {
    id: "96F061DA-490E-FC0D-49DC-2DF792191D0E",
    name: "Quis Pede Incorporated",
    created_at: "2018-02-03T18:04:16-08:00"
  },
  {
    id: "18E84D3E-587E-805D-D92A-E96F3C57EF6D",
    name: "Id Associates",
    created_at: "2019-04-30T21:18:36-07:00"
  },
  {
    id: "14EDB472-325D-0B17-2577-AD03C19753CD",
    name: "In Felis Ltd",
    created_at: "2018-08-17T23:41:45-07:00"
  },
  {
    id: "E55B5FEB-1293-1EE1-8026-D4B77691DBAB",
    name: "Ac Ltd",
    created_at: "2018-07-23T23:15:23-07:00"
  },
  {
    id: "0F94AB01-6132-0337-5EF1-6E563FABEF44",
    name: "Suscipit Est Corporation",
    created_at: "2017-10-18T01:32:55-07:00"
  },
  {
    id: "ECF11E61-3EF4-D86A-6D01-C0604E532A1D",
    name: "Aliquam Rutrum Lorem Corporation",
    created_at: "2018-03-01T01:54:39-08:00"
  },
  {
    id: "01CB5CD6-88F5-94FD-C3FB-0FD30D36D09A",
    name: "Nunc Quisque Associates",
    created_at: "2019-04-12T23:18:37-07:00"
  },
  {
    id: "D7CF29FD-3F2F-4447-B8DD-C89E36A23B98",
    name: "Enim Sed Nulla Associates",
    created_at: "2018-10-14T21:57:02-07:00"
  },
  {
    id: "A0E7593B-835A-0328-F769-7F1EC682DEF5",
    name: "Vestibulum Corp.",
    created_at: "2017-11-16T22:16:36-08:00"
  },
  {
    id: "8874F317-62A5-1100-FC32-E0ABE0C639E2",
    name: "Vitae Orci LLC",
    created_at: "2018-10-11T20:21:26-07:00"
  },
  {
    id: "4E292247-4780-EE11-648E-639998174533",
    name: "Ultricies Inc.",
    created_at: "2019-01-16T06:32:49-08:00"
  },
  {
    id: "CC8F14B9-C461-F5BD-1A75-98973DA5360E",
    name: "Vitae Purus Inc.",
    created_at: "2018-06-03T19:26:51-07:00"
  },
  {
    id: "E8E4E6D8-CDDB-610C-6F11-4DBDBBD3CB75",
    name: "Nunc Company",
    created_at: "2017-10-22T02:20:43-07:00"
  },
  {
    id: "0CA55E4B-3AFE-4CC3-EA71-F9514CF3A2E2",
    name: "Donec Sollicitudin Adipiscing Institute",
    created_at: "2018-11-27T14:47:24-08:00"
  },
  {
    id: "47878EAB-0313-4245-9074-930E353DCC88",
    name: "Nullam Lobortis Quam Industries",
    created_at: "2019-01-04T04:44:48-08:00"
  },
  {
    id: "D49B13D0-5986-3A55-D0C7-626A0C26EFEF",
    name: "Etiam Bibendum LLC",
    created_at: "2019-03-19T16:24:53-07:00"
  },
  {
    id: "BE8792B3-AFD3-3321-0366-D7F22694485E",
    name: "Sem Eget Massa PC",
    created_at: "2018-02-01T20:18:53-08:00"
  },
  {
    id: "21B5C325-3D69-6C85-4389-8FA7BC316832",
    name: "Nunc Corp.",
    created_at: "2018-04-25T00:12:14-07:00"
  },
  {
    id: "B130650A-C624-ACDC-F3C6-E23510CE814A",
    name: "Tempus Eu Corp.",
    created_at: "2018-06-03T04:37:58-07:00"
  },
  {
    id: "0A6B21C4-4903-88E8-42A3-853FE07EAF6D",
    name: "Consequat Purus Limited",
    created_at: "2019-08-16T16:52:29-07:00"
  },
  {
    id: "F6AA992E-E6FA-9020-FDFF-5577B1397A92",
    name: "Arcu Ltd",
    created_at: "2019-04-03T10:59:59-07:00"
  },
  {
    id: "BF827C76-1D27-402E-216C-AFC6A38C9FF7",
    name: "At Velit Industries",
    created_at: "2019-04-21T14:34:53-07:00"
  },
  {
    id: "DE30D892-6DE0-E1DA-71A2-EDA355452296",
    name: "Pede Associates",
    created_at: "2019-01-22T08:08:19-08:00"
  },
  {
    id: "D562CDBE-AC9B-90B7-6489-23BCD7A004F4",
    name: "Phasellus PC",
    created_at: "2018-08-21T04:46:06-07:00"
  },
  {
    id: "404C300D-49FD-7026-652E-8B47DAB7B253",
    name: "Sociis Ltd",
    created_at: "2017-11-05T09:46:07-08:00"
  },
  {
    id: "DCE4FF10-39C2-D845-AC63-8AF895F61E1D",
    name: "Morbi Tristique Limited",
    created_at: "2018-10-28T17:58:35-07:00"
  },
  {
    id: "812DE20D-0D35-2D62-F925-C17AC561CC0F",
    name: "Et Arcu Imperdiet Corp.",
    created_at: "2019-06-30T11:15:58-07:00"
  },
  {
    id: "A3431727-74EF-14E7-044E-E91947484EC0",
    name: "Eget Odio Industries",
    created_at: "2019-08-14T19:11:53-07:00"
  },
  {
    id: "E672513B-AE56-087D-5239-8EDEAF7041AB",
    name: "Tincidunt Associates",
    created_at: "2019-06-09T18:31:22-07:00"
  },
  {
    id: "D64A72B1-B71A-ACC3-F6DA-744038CF1131",
    name: "Scelerisque Lorem Industries",
    created_at: "2018-10-31T01:03:21-07:00"
  },
  {
    id: "1058A028-65B7-AE30-6A3F-F4AEF7F6E705",
    name: "A Consulting",
    created_at: "2019-04-09T04:54:27-07:00"
  },
  {
    id: "10E519A0-1754-F886-3A1D-3EF13C0EC7BA",
    name: "Justo LLC",
    created_at: "2018-12-13T19:34:13-08:00"
  },
  {
    id: "151E2CB7-806E-6427-41C3-A4713542F5F7",
    name: "Ridiculus Mus Corp.",
    created_at: "2019-03-27T22:09:56-07:00"
  },
  {
    id: "48CBBE46-243F-9C43-BA7C-B2251043CEE7",
    name: "Neque Morbi Inc.",
    created_at: "2018-06-27T01:08:53-07:00"
  },
  {
    id: "71500D4C-3F00-BA70-3000-24290B1145F1",
    name: "Egestas Foundation",
    created_at: "2019-03-09T04:36:28-08:00"
  },
  {
    id: "17A4B15C-D8FE-1C6B-6577-351D10E18DAD",
    name: "Tincidunt Institute",
    created_at: "2018-11-17T07:45:06-08:00"
  },
  {
    id: "15F79638-DBB6-FE5B-55ED-EE3FFA4F41C0",
    name: "Mattis Limited",
    created_at: "2019-08-01T12:19:14-07:00"
  },
  {
    id: "19B8D256-05E7-C9FF-440E-117C9C86E101",
    name: "Id Corp.",
    created_at: "2019-09-06T07:11:22-07:00"
  },
  {
    id: "B6CFF32B-7A83-D91B-6E09-3A8D68CA662F",
    name: "Tristique PC",
    created_at: "2019-07-27T15:04:05-07:00"
  }
].map(d => {
  const user = users[Math.floor(Math.random() * users.length)];
  return {
    id: d.id,
    name: d.name,
    owner: user.id,
    width: 500,
    height: 500,
    createdAt: new Date(d.created_at),
    updatedAt: new Date(d.created_at),
    contributors: getContributors(users.length),
    paints: []
  } as DrawingJSON;
});

export const testSqlDrawings: SqlDrawing[] = drawings.map(d => ({
  id: d.id,
  name: d.name,
  owner_id: typeof d.owner === "string" ? d.owner : d.owner.id,
  width: d.width,
  height: d.height,
  created_at: new Date(),
  updated_at: new Date(),
  data: d.paints
}));

export const testSqlDrawingContributors: SqlDrawingContributor[] = testSqlDrawings
  .map(d =>
    getContributors(users.length).map(i => ({
      id: uuidv4(),
      user_id: users[i].id,
      drawing_id: d.id
    }))
  )
  .reduce((l, r) => l.concat(r), [] as SqlDrawingContributor[]);
