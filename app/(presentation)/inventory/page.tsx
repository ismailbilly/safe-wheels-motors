import { ClassifiedCard } from "@/components/inventory/classified-card";
import { ClassifiedsList } from "@/components/inventory/classifieds-list";
import { CustomPagination } from "@/components/shared/custom-pagination";
import { AwaitedPageProps, Favourites, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import { routes } from "@/config/routes";
import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { PageSchema } from "@/app/schema/page.schema";


const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  const validPage = PageSchema.parse(searchParams?.page);

  // get the current page
  const page = validPage ? validPage : 1;

  // calculate the offset
  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;

  return prisma.classified.findMany({
//    where: buildClassifiedFilterQuery(searchParams),
    include: { images: { take: 1 } },
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  });
};



export default async function InventoryPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const classifieds = await getInventory(searchParams);
  // console.log("====================================");
  // console.log(JSON.stringify(classifieds, null,2));
  // console.log("====================================");
  const count = await prisma.classified.count();
  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");
	const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);

  return (
    <div className="flex">
			{/* <Sidebar minMaxValues={minMaxResult} searchParams={searchParams} /> */}

			<div className="flex-1 p-4 bg-white">
				<div className="flex space-y-2 items-center justify-between pb-4 -mt-1">
					<div className="flex justify-between items-center w-full">
						<h2 className="text-sm md:text-base lg:text-xl font-semibold min-w-fit">
							We have found {count} classifieds
						</h2>
						{/* <DialogFilters
							minMaxValues={minMaxResult}
							count={count}
							searchParams={searchParams}
						/> */}
					</div>
					<CustomPagination
						baseURL={routes.inventory}
						totalPages={totalPages}
						styles={{
							paginationRoot: "justify-end hidden lg:flex",
							paginationPrevious: "",
							paginationNext: "",
							paginationLink: "border-none active:border text-black",
							paginationLinkActive: "",
						}}
					/>
				</div>

					<ClassifiedsList
						classifieds={classifieds}
						favourites={favourites ? favourites.ids : []}
					/>
      </div>
    </div>
  );
}
