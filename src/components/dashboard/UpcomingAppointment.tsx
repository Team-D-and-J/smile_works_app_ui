import moment from "moment";

function UpcomingAppointment({ appointment }: UpcomingApptProps) {
  return (
    <div className="flex">
      <div>{moment(appointment.time).format("h:mm A")}</div>
      <div className="flex flex-col">
        <div>{appointment.patientName}</div>
        <div>{appointment.doctorId}</div>
        <div>{appointment.treatmentMaster}</div>
      </div>
    </div>
  );
}

export default UpcomingAppointment;

interface UpcomingApptProps {
  appointment: {
    doctorId: string;
    patientId: string;
    time: string;
    patient: string;
    doctor: string;
    treatmentMaster: string;
    patientName: string;
    doctorName: string;
  };
}
