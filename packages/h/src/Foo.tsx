import { h, defineComponent, PropType } from 'vue-demi';

const Noop = () => true;
function EmitType<T extends Function>() {
  return Noop as any as T;
}

export default defineComponent({
  props: {
    foo: {
      type: String,
      required: true,
    },
    bar: {
      type: Object as PropType<{ foo: string; bar: number }>,
      required: true,
    },
    ref: { type: Object as PropType<{ foo: string }> },
    children: { type: Object as PropType<{ foo: string }>, default: undefined },
  },
  emits: {
    click: EmitType<(evt: { type: 'click' }) => void>(),
  },

  setup(props, { emit, slots }) {},
});
