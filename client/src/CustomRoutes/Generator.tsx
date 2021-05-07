export const Dashboard = () => (
  <div>
    <p>Name</p>
    <textarea id="name"></textarea>

    <p>Tags</p>
    <textarea id="tags"></textarea>

    <p>Job Info</p>
    <textarea id="jobInfo"></textarea>

    <br></br>
    <button
      onClick={async () => {
        // @ts-ignore YOLO
        const name = document.querySelector('#name')!.value;
        // @ts-ignore YOLO
        const job_info = document.querySelector('#jobInfo')!.value;
        // @ts-ignore YOLO
        const tags = document.querySelector('#tags')!.value.split(',');
        const resp = await fetch(
          'http://192.168.10.11:58050/generate-profile',
          {
            body: JSON.stringify({
              engineer_name: name,
              job_info: job_info,
              tags: tags,
              initial_profile: '',
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          }
        );

        const j = await resp.json();

        // @ts-ignore YOLO
        document.querySelector('#output')!.value = JSON.stringify(j, null, 2);
      }}
    >
      Generate
    </button>

    <p>Output</p>

    <textarea id="output"></textarea>
  </div>
);
