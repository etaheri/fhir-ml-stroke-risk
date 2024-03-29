import { createResource, For, Show } from "solid-js";

// Fetch patients from the HAPI FHIR server
const fetchPatients = async () =>
  (
    await fetch(`${import.meta.env.VITE_SOLID_APP_HAPI_URL}/fhir/Patient`)
  ).json();

function Patients() {
  const [patients] = createResource(fetchPatients);

  return (
    <>
      <h3 class="text-3xl font-bold dark:text-white">Patients</h3>
      <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full mt-6">
        <div class="relative overflow-x-auto">
          <Show when={!patients()}>
            <div class="flex justify-center items-center">
              <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            </div>
          </Show>
          <Show when={patients()}>
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
                <For each={patients()?.entry}>
                  {(patient) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {patient?.resource?.name[0].family},{" "}
                        {patient?.resource?.name[0].given}
                      </th>
                      <td class="px-6 py-4">
                        {" "}
                        <a
                          href={patient?.resource?.id}
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
          </Show>
        </div>
      </div>
    </>
  );
}

export default Patients;
