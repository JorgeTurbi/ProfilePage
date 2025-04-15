import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { SafeResourceUrlPipe } from "../../safe-resource-url.pipe"


@Component({
  selector: "app-root",
  standalone: true,
  imports: [ CommonModule,SafeResourceUrlPipe],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "profile-page"
  showMap = false

  profileData = {
    name: "Jorge Turbí Lachapel",
    position: "Software Developer",
    description: [
      "Expert in scalable software systems using .NET Core, Angular, and Clean Architecture.",
      "I help businesses and governments build secure, efficient, and custom software solutions.",
    ],
    contact: {
      mobile: "8294627091",
      telephone: "8294627091",
      email: "jturbi@syschar.com",
    },
    company: {
      name: "Syschar Solutions",
      position: "Software Developer",
      address: {
        street: "Jose Francisco Peña Gomez 7",
        city: "Santo Domingo Este",
        region: "Santo Domingo",
        postalCode: "11802",
        country: "Dominican Republic",
      },
      website: "https://www.syschar.com",
    },
    location: {
      latitude: 18.508504086784622,
      longitude: -69.8215030463178,
    },
    profileImage:
      "https://firebasestorage.googleapis.com/v0/b/confiapp-d8b61.appspot.com/o/3G6Ho5BkRmCP3uCGNeuGHQ.jpeg?alt=media&token=97d4601d-523f-4a16-a020-ad82022a7216",
  }

  toggleMap() {
    this.showMap = !this.showMap
  }


  downloadVcard(): void {
    const vcardContent = `BEGIN:VCARD
  VERSION:3.0
  N:${this.profileData.name}
  FN:${this.profileData.name}
  TITLE:${this.profileData.position}
  ORG:${this.profileData.company.name}
  TEL;TYPE=cell:${this.profileData.contact.mobile}
  TEL;TYPE=work:${this.profileData.contact.telephone}
  EMAIL:${this.profileData.contact.email}
  ADR:;;${this.profileData.company.address.street};${this.profileData.company.address.city};${this.profileData.company.address.region};${this.profileData.company.address.postalCode};${this.profileData.company.address.country}
  URL:${this.profileData.company.website}
  END:VCARD`;

    const blob = new Blob([vcardContent], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'contact.vcf';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  sharePage(): void {
    if (navigator.share) {
      navigator.share({
        title: 'Contact ' + this.profileData.name,
        text: 'Here is the contact information of ' + this.profileData.name,
        url: window.location.href,
      }).catch(error => console.error('Error sharing:', error));
    } else {
      alert('Sharing is not supported in this browser.');
    }
  }


}
