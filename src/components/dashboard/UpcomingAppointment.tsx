import moment from "moment";

function UpcomingAppointment({ appointment }: UpcomingApptProps) {
  return (
    <div className="flex items-center gap-4 p-2 rounded-lg border border-gray ">
      <div className="text-lg text-btnDark w-20 text-center">
        {moment(appointment.date).format("h:mm A")}
      </div>
      <div className="flex flex-col  whitespace-nowrap">
        <div className="text-lg font-medium text-gray-900">
          {appointment.patientName}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Dentist: </span>
          {appointment.doctorName}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Treatment:</span>
          {appointment.treatmentMaster}
        </div>
      </div>
    </div>
  );
}

export default UpcomingAppointment;

interface UpcomingApptProps {
  appointment: {
    doctorId: string;
    patientId: string;
    date: string;
    patient: string;
    doctor: string;
    treatmentMaster: string;
    patientName: string;
    doctorName: string;
  };
}
