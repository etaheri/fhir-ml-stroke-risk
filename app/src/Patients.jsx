import { createResource, For } from "solid-js";

const fetchPatients = async () =>
  (await fetch(`https://rickandmortyapi.com/api/character`)).json();

function Patients() {
  const [patients] = createResource(fetchPatients);

  return (
    <>
      <h3 class="text-3xl font-bold dark:text-white">Patients</h3>
      <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full mt-6">
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Patient name
                </th>
                <th scope="col" class="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <For each={patients()?.results}>
                {(patient) => (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {patient.name}
                    </th>
                    <td class="px-6 py-4">
                      {" "}
                      <a
                        href={patient.id}
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        View Patient
                      </a>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Patients;
