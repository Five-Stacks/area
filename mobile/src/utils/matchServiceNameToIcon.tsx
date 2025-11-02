import dotdotdotIcon from "@/assets/images/dotdotdotIcon.png";
import clockIcon from "@/assets/images/clockIcon.png";
import githubLogo from "@/assets/images/githubLogo.png";
import googleLogo from "@/assets/images/googleLogo.png";
import discordLogo from "@/assets/images/discordLogo.png";
import spotifyLogo from "@/assets/images/SpotifyLogo.png";
import twitterLogo from "@/assets/images/TwitterLogo.png";
import microsoftLogo from "@/assets/images/MicrosoftLogo.png";

export function matchServiceToIcon(name: string): any {
  switch (name) {
    case "Timer":
      return clockIcon;
    case "Google":
      return googleLogo;
    case "Github":
      return githubLogo;
    case "Discord":
      return discordLogo;
    case "Spotify":
      return spotifyLogo;
    case "Twitter":
      return twitterLogo;
    case "Microsoft":
      return microsoftLogo;
    default:
      return dotdotdotIcon;
  }
}
