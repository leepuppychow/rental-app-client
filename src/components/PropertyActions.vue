<template>
  <div class="property-actions">
    <h3>ACTIONS:</h3>
    <button class="action-button" @click="sendBillEmail(mailerInfo)">Send Bill Email to Tenants</button>
    <button class="action-button" @click="toggleNewTenantModal()">
        Add New Tenant 
    </button>
    <button class="action-button" @click="toggleNewBillModal()">
        Add New Bill
    </button>
    <button class="action-button" >
        Edit Property
    </button>
    <button class="action-button danger" @click="deleteProperty(property.id)">
        Remove Property
    </button>
    <input v-model="rentAmount" type="number" />
    <button class="action-button" @click="setRent({ property: property, rent: rentAmount })">
        Set Rent
    </button>
    <button @click="generatePDF()">
      TEST PDF
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import jsPDF from 'jspdf';

export default {
  props: [
    'property', 
    'rentAmount', 
    'toggleNewTenantModal', 
    'toggleNewBillModal',
    'mailerInfo',
  ],
  methods: {
    ...mapActions([
      'sendBillEmail',
      'deleteProperty',
      'setRent',
    ]),
    generatePDF() {
      const doc = new jsPDF()

      doc.text('Hello world!', 10, 10);
      doc.save('test.pdf');

      let blob = doc.output('blob');
      let file = new File([blob], 'test.pdf', {type: 'pdf', lastModified: Date.now()});

      // Could I have the PDF be uploaded to S3 bucket and then emailed?

    },
    sendPDF() {
      fetch('http://localhost:3000/api/v1/generate-PDF', {
        method: 'POST',
        'Content-Type': 'application/json',
        responseType: 'stream',
      })
        .then(response => {
          debugger;
          const reader = response.body.getReader()
          reader.read()
            .then(({ done, value}) => {
              debugger
            })
        })
        .catch(error => {
          console.log(error);
          debugger;
        })
    }
  },
  
}
</script>

<style>

</style>


