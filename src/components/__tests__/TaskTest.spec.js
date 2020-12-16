import { shallowMount } from "@vue/test-utils";
import Task from "@/components/Task";

describe("Test Task", () => {
  const propsNew = {
    new: true,
    id: null,
    title: "",
    description: "",
    priority: "0"
  };
  const propsEdit = {
    new: false,
    id: 1,
    title: "A Title",
    description: "A description",
    priority: "3"
  };
  it("renders props new Task", () => {
    const wrapper = buildWrapper(propsNew);

    expect(wrapper.props()).toEqual(propsNew);
  });

  it("renders props when edit Task", () => {
    const wrapper = buildWrapper(propsEdit);

    expect(wrapper.html()).toContain(propsEdit.title);
    expect(wrapper.html()).toContain(propsEdit.description);
    expect(
      wrapper.find(".priority-" + propsEdit.priority).exists()
    ).toBeTruthy();
  });

  it("Cancel Event on new Task", async () => {
    const wrapper = buildWrapper(propsNew);

    await wrapper.find("#cancel-button").trigger("click");
    await console.log(wrapper.emitted());
    expect(wrapper.emitted()).toEqual({ clean: [[]] });
  });

  it("Cancel Event on Edit Task", async () => {
    const wrapper = buildWrapper(propsEdit);

    await wrapper.find("#edit-button").trigger("click");
    await wrapper.find("#cancel-button").trigger("click");

    expect(wrapper.props().onEdit).toBeFalsy();
  });
});

function buildWrapper(props) {
  return shallowMount(Task, {
    propsData: props
  });
}
