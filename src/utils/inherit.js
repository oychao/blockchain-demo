export default function (obj, cls) {
    obj.__proto__ = cls.prototype;
};
