const authHeaders = () => ({ authorization: localStorage.getItem('token_id') });
const baseURL = 'http://localhost:3000/api/v1';

const mailer = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    sendBillEmail({}, payload) {
      const { tenants, bills, totalDue } = payload;
      const emailPromises = [];

      tenants.forEach((tenant) => {
        const body = {
          tenant,
          bills,
          totalDue,
        };

        emailPromises.push(
          fetch(`${baseURL}/send-email`, {
            method: 'POST',
            headers: {
              ...authHeaders(),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          })
            .then(response => response.json())
            .then(() => console.log(`Email sent successfully to: ${tenant.email}`))
            .catch(error => console.log({ error })),
        );
      });

      Promise.all(emailPromises)
        .then(() => alert('All emails were sent successfully'))
        .catch(error => console.log({ error }));
    },
  },
};

export default mailer;