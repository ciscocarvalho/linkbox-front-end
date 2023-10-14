import DashboardItem from "./DashboardItem";

class DashboardLink extends DashboardItem {
  title!: string;
  url!: string;

  constructor(title: string, url: string, backgroundColor?: string) {
    super();
    this.update({ title, url, backgroundColor });
  }

  clone() {
    const clonedLink = new DashboardLink(
      this.title,
      this.url,
      this.backgroundColor
    );
    clonedLink.setParent(this.getParent());
    return clonedLink;
  }

  update(updatedFields: Partial<DashboardLink>) {
      if (updatedFields.title) {
        this.title = updatedFields.title;
      }

      if (updatedFields.url) {
        this.url = updatedFields.url;
      }

      if (updatedFields.backgroundColor) {
        this.backgroundColor = updatedFields.backgroundColor;
      }
  }

  remove() {
    this.getParent()?.removeChild(this);
  }
}

export default DashboardLink;