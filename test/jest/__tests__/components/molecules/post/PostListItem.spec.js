import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
import * as All from "quasar";
import PostListItem from "src/components/molecules/post/PostListItem.vue";
import Post from "src/lib/domain/entities/post";
// import langEn from 'quasar/lang/en-us' // change to any language you wish! => this breaks wallaby :(
const { Quasar } = All;

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key];
  if (val && val.component && val.component.name != null) {
    object[key] = val;
  }
  return object;
}, {});

describe("PostListItem", () => {
  const localVue = createLocalVue();
  localVue.use(Quasar, { components }); // , lang: langEn

  const createWrapper = (options = {}) => {
    const wrapper = mount(PostListItem, {
      localVue,
      ...options,
    });
    const postItem = wrapper.find("[data-testid=postItem]");
    const postTitle = wrapper.find("[data-testid=postTitle]");
    const postDescription = wrapper.find("[data-testid=postDescription]");
    const postThumbnail = wrapper.find("[data-testid=postThumbnail]");

    return {
      wrapper,
      postItem,
      postTitle,
      postDescription,
      postThumbnail,
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
    published_at: "2022-02-02T00:00:00.000Z",
    created_at: "2022-02-02T00:00:00.000Z",
    updated_at: "2022-02-02T00:00:00.000Z",
  });

  it("Should render post list item correctly", () => {
    // arrange
    const propsData = {
      post,
    };

    // act
    const { postItem, postTitle, postDescription, postThumbnail } =
      createWrapper({
        propsData,
      });

    // assert
    expect(postItem.exists()).toBeTruthy();
    // validate post title being rendered correctly
    expect(postTitle.text()).toContain(post.title);
    // validate post description being rendered correctly
    expect(postDescription.text()).toContain(post.description);
    // validate post thumbnail being rendered correctly
    expect(postThumbnail.exists()).toBeTruthy();
  });

  it("Should not display thumbnail if not provided", () => {
    // arrange
    const propsData = {
      post: Post.fromJson({
        ...post.toJson(),
        featured_images: {},
      }),
    };

    // act
    const { postThumbnail } = createWrapper({
      propsData,
    });

    // assert
    expect(postThumbnail.exists()).toBeFalsy();
  });
});
