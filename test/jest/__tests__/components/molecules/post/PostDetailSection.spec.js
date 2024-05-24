import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import * as All from "quasar";
import PostDetailSection from 'src/components/molecules/post/PostDetailSection.vue';
import Post from "src/lib/domain/entities/post";
const { Quasar } = All;

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key];
  if (val && val.component && val.component.name != null) {
    object[key] = val;
  }
  return object;
}, {});

describe('PostDetailSection.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(Quasar, { components }); // , lang: langEn

  let store;
  let actions;
  let getters;

  const auth = {
    namespaced: true,
    state: {
      // mock state here
    },
    actions: {
      // mock actions here
    },
    getters: {
      isAuthenticated: () => true, // mock isAuthenticated getter
    },
  };

  beforeEach(() => {
    actions = {
      // If your component dispatches actions, mock them here
    };
    getters = {
      // If your component uses getters, mock them here
    };

    store = new Vuex.Store({
      modules: {
        auth,
      },
      actions,
      getters,
    });
  });
  const createWrapper = (options = {}) => {
    const wrapper = mount(PostDetailSection, {
      localVue,
      store,
      mocks: {
        $route: {
          params: {
            slug: 'post-title'
          }
        }
      },
      ...options,
    });
    const postDetailSection = wrapper.find("[data-testid=postDetailSection]");
    const postTitle = wrapper.find("[data-testid=postTitle]");
    const postDescription = wrapper.find("[data-testid=postDescription]");
    const postAuthor = wrapper.find("[data-testid=postAuthor]");
    const postThumbnail = wrapper.find("[data-testid=postThumbnail]");
    const postContent = wrapper.find("[data-testid=postContent]");
    const postContentProtected = wrapper.find("[data-testid=postContentProtected]");
    const unlockContent = wrapper.find("[data-testid=unlockContent]");

    return {
      wrapper,
      postDetailSection,
      postTitle,
      postDescription,
      postThumbnail,
      postAuthor,
      postContent,
      postContentProtected,
      unlockContent,
    };
  };

  const post = Post.fromJson({
    id: 1,
    title: "Post Title",
    slug: "post-title",
    description: "lorem ipsum dolor sit amet",
    featured_images: {
      128: "https://picsum.photos/128/128",
    },
    content: {
      "time": 1716351530201,
      "blocks": [
        {
          "id": "Y7V0YvZ1_b",
          "type": "header",
          "data": {
            "text": "A Lorem Ipsum",
            "level": 1
          }
        },
        {
          "id": "HzWvdm1GuP",
          "type": "paragraph",
          "data": {
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <b>eiusmod</b> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea <i><b>commodo</b></i> consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          }
        }
      ],
      "version": "2.26.5"
    },
    published_at: "2022-02-02T00:00:00.000Z",
    created_at: "2022-02-02T00:00:00.000Z",
    updated_at: "2022-02-02T00:00:00.000Z",
    have_protected_content: true,
  });
  it("Should render post detail correctly on desktop", () => {
    // arrange
    const propsData = {
      post,
    };

    // act
    const { postDetailSection, postTitle, postAuthor, postDescription, postThumbnail, postContent } =
      createWrapper({
        propsData,
      });

    // assert
    expect(postDetailSection.exists()).toBeTruthy();
    // validate post title being rendered correctly
    expect(postTitle.text()).toContain(post.title);
    // validate post author being rendered correctly
    expect(postAuthor.text()).toContain(post.postPublishedAt);
    // validate post description should not be rendered
    expect(postDescription.exists()).toBeFalsy();
    // validate post thumbnail being rendered correctly
    expect(postThumbnail.exists()).toBeTruthy();
    expect(postContent.exists()).toBeTruthy();
  });

  it("Should render post detail correctly on mobile", () => {
    // arrange
    const propsData = {
      post,
    };

    // Mock window.innerWidth to simulate a smaller viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 760
    });

    // act
    const { postDetailSection, postTitle, postDescription, postAuthor, postThumbnail, postContent } =
      createWrapper({
        propsData,
      });

    // assert
    expect(postDetailSection.exists()).toBeTruthy();
    // validate post title being rendered correctly
    expect(postTitle.text()).toContain(post.title);
    // validate post author should not be rendered
    expect(postAuthor.exists()).toBeFalsy();
    // validate post description being rendered correctly
    expect(postDescription.text()).toContain(post.description);
    // validate post thumbnail being rendered correctly
    expect(postThumbnail.exists()).toBeTruthy();
    expect(postContent.exists()).toBeTruthy();
  });

  it("Should not render protected content when user is not authenticated", () => {
    // arrange
    const propsData = {
      post,
    };

    // Create a new store with a mock isAuthenticated getter that returns false
    store = new Vuex.Store({
      modules: {
        auth: {
          ...auth,
          getters: {
            isAuthenticated: () => false,
          },
        },
      },
      actions,
    });

    // act
    const { unlockContent } = createWrapper({
      propsData,
    });

    expect(unlockContent.exists()).toBeTruthy();
  });

  it("Should render protected content when user is authenticated", () => {
    // arrange
    const propsData = {
      post,
    };

    // Create a new store with a mock isAuthenticated getter that returns true
    store = new Vuex.Store({
      modules: {
        auth: {
          ...auth,
          getters: {
            isAuthenticated: () => true,
          },
        },
      },
      actions,
    });

    // act
    const { postContentProtected, unlockContent } = createWrapper({
      propsData,
    });

    // assert
    expect(postContentProtected.exists()).toBeTruthy();
    expect(unlockContent.exists()).toBeFalsy();
    // validate protected content being rendered correctly
    expect(postContentProtected.text()).toContain(post.postContentProtected);
  });
});
