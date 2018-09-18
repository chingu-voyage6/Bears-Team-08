import { Role } from "@shared/contract";
import { User } from "./entities";
import { SqlUser } from "./repositories/user";
import { uuidv4 } from "./lib/crypto";

export const testAdminUser: User = {
  id: "4b431ba4-f8c0-4aa5-a90f-5949650cfce3",
  username: "admin",
  hash: "$2a$10$sMG3IAuHr0rIwav4D8no4O7ecapZAxLAryGEW8TPXUIE.prFBmUgG",
  firstName: "jared",
  lastName: "rickert",
  role: Role.admin,
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
  role: Role.user,
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
