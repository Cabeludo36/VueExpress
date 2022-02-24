<template>
  <div class="col-sm-9">
    <h4><small>RECENT POSTS</small></h4>
    <hr />
    <h2>I Love Food</h2>
    <h5>
      <span class="glyphicon glyphicon-time"></span> Post by Jane Dane, Sep 27,
      2015.
    </h5>
    <h5>
      <span class="label label-danger">Food</span>
      <span class="label label-primary">Ipsum</span>
    </h5>
    <br />
    <p>
      Food is my passion. Lorem ipsum dolor sit amet, consectetur adipiscing
      elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    <br /><br />

    <h4><small>RECENT POSTS</small></h4>
    <hr />
    <router-view />

    <hr />
    <h4>Leave a Comment:</h4>
    <form role="form">
      <div class="form-group">
        <textarea class="form-control" rows="3" required></textarea>
      </div>
      <button type="submit" class="btn btn-success">Submit</button>
    </form>
    <br /><br />

    <p><span class="badge">2</span> Comments:</p>
    <br />

    <div class="row">
      <div class="col-sm-2 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          class="bi bi-file-person"
          viewBox="0 0 16 16"
        >
          <path
            d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"
          />
          <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
      </div>
      <div class="col-sm-10">
        <h4>Anja <small>Sep 29, 2015, 9:12 PM</small></h4>
        <p>
          Keep up the GREAT work! I am cheering for you!! Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua.
        </p>
        <br />
      </div>
      <div class="col-sm-2 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          class="bi bi-file-person"
          viewBox="0 0 16 16"
        >
          <path
            d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"
          />
          <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
      </div>
      <div class="col-sm-10">
        <h4>John Row <small>Sep 25, 2015, 8:25 PM</small></h4>
        <p>
          I am so happy for you man! Finally. I am looking forward to read about
          your trendy life. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua.
        </p>
        <br />
        <p><span class="badge">1</span> Comment:</p>
        <br />
        <div class="row">
          <div class="col-sm-2 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              class="bi bi-file-person"
              viewBox="0 0 16 16"
            >
              <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
              <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </div>
          <div class="col-xs-10">
            <h4>Nested Bro <small>Sep 25, 2015, 8:28 PM</small></h4>
            <p>Me too! WOW!</p>
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script  lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  async created() {
    try {
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      this.error = err.messege;
    }
  },
})

export default class UserHome extends Vue {}
</script>