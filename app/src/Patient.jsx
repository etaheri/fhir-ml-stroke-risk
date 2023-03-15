import { useParams } from "@solidjs/router";
import { createResource } from "solid-js";

const fetchPatient = async (id) =>
  (await fetch(`https://rickandmortyapi.com/api/character/${id}`)).json();


// {
//   "gender": "Male",
//   "age": 79,
//   "hypertension": 1,
//   "heart_disease": 1,
//   "ever_married": "No",
//   "work_type": "Never_worked",
//   "Residence_type": "Urban",
//   "avg_glucose_level": 60,
//   "bmi": 28.10,
//   "smoking_status": "smokes"
// }
function Patient() {
  const params = useParams();
  const [patient] = createResource(params.id, fetchPatient);

  return (
    <>
      <h3 class="text-3xl font-bold dark:text-white">Patient Name</h3>
      <div class="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
        <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold leading-none text-gray-900">
              Patient Information
            </h3>
          </div>
          <div class="flow-root">
            <ul role="list" class="divide-y divide-gray-200">
              <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                  <p class="inline-flex items-center text-base font-semibold text-gray-900">
                    Name: {patient()?.name}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold leading-none text-gray-900">
              Stroke Risk Score
            </h3>
          </div>
          <div class="flow-root">
            <ul role="list" class="divide-y divide-gray-200">
              <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                  [insert chart here]
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
        <div class="relative overflow-x-auto mt-6">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Patient name
                </th>
                <th scope="col" class="px-6 py-3">
                  Patient name
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Test Patient
                </th>
                <td class="px-6 py-4">
                  {" "}
                  <a
                    href="/1"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    View Patient
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Patient;
