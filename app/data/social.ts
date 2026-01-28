import {
  BiLinkExternal,
  BiLogoGithub,
  BiLogoLinkedinSquare,
  BiLogoInstagram,
  BiLogoFacebookSquare,
} from "react-icons/bi";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export const socialLinks = [
  {
    id: 1,
    name: "GitHub",
    url: "https://github.com/semsem-dev",
    icon: BiLogoGithub,
    status: "social",
  },
  {
    id: 2,
    name: "Linkedin",
    url: "https://linkedin.com/in/semsem-dev",
    icon: BiLogoLinkedinSquare,
    status: "social",
  },
  {
    id: 3,
    name: "Email",
    url: "mailto:hassan.elseoudy@gmail.com",
    icon: MdEmail,
    status: "social",
  },
  {
    id: 4,
    name: "Instagram",
    url: "https://www.instagram.com/semsem.dev",
    icon: BiLogoInstagram,
    status: "social",
  },
  {
    id: 5,
    name: "Facebook",
    url: "https://www.facebook.com/Hassan.A.Elseoudy/",
    icon: BiLogoFacebookSquare,
    status: "social",
  },
];
