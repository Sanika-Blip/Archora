import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Facilities } from "./pages/Facilities";
import { OurFlow } from "./pages/OurFlow";
import { WhyUs } from "./pages/WhyUs";
import { Journal } from "./pages/Journal";
import { JournalPost } from "./pages/JournalPost";
import { Contact } from "./pages/Contact";
import { Layout } from "./components/Layout";
import { ServiceDetailWrapper } from "./pages/ServiceDetailWrapper";
import { FacilityDetailPage } from "./pages/FacilityDetailPage";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "services/:slug", Component: ServiceDetailWrapper },
      { path: "facilities", Component: Facilities },
      { path: "facilities/:facilityId", Component: FacilityDetailPage },
      { path: "our-flow", Component: OurFlow },
      { path: "why-us", Component: WhyUs },
      { path: "journal", Component: Journal },
      { path: "journal/:id", Component: JournalPost },
      { path: "contact", Component: Contact },
    ],
  },
]);