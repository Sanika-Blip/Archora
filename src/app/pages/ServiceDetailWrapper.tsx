import { useParams, useNavigate, Navigate } from "react-router";
import { ServiceDetailPage, servicesData } from "./ServiceDetailPage";

export function ServiceDetailWrapper() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = servicesData.find(s => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  return (
    <ServiceDetailPage
      service={service}
      onBack={() => navigate("/services")}
    />
  );
}