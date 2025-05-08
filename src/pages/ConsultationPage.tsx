import Header from "../components/common/Header";
import ConsultationList from "../components/consultation/ConsultationList";

const ConsultationPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Consultation" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <ConsultationList />
      </main>
    </div>
  );
};

export default ConsultationPage;
