<template>
  <v-app>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            align="center"
          >
            <img alt="vue-logo" src="./assets/logo.png">
          </v-col>
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="secpmdary"
                dark
                flat
              >
                <v-toolbar-title>Diacritic Remover</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Diacritic Text"
                    name="diacriticText"
                    v-model="diacriticText"
                    placeholder="Type here text with accents/diacritics"
                    outlined
                  />

                  <v-text-field
                    label="Diacritic-free Text"
                    name="cleanText"
                    v-model="cleanText"
                    placeholder=" "
                    outlined
                    readonly
                  />
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import DiacriticRemover from '@marketto/diacritic-remover';
  const diacriticRemover = new DiacriticRemover();

  export default {
    data: () => ({
      diacriticText: "",
      get cleanText() {
        return diacriticRemover.replace(this.diacriticText);
      }
    }),
  }
</script>
<style lang="sass">

</style>